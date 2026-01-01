'use client';

import { useState, useCallback, useRef } from 'react';

interface UseFileUploadOptions {
	onFileProcessed: (imageUrl: string, fileName: string) => void | Promise<void>;
	acceptedTypes?: string[];
	maxWidth?: number;
	maxHeight?: number;
	quality?: number;
}

async function compressImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		img.onload = () => {
			let { width, height } = img;

			// Calculate new dimensions while maintaining aspect ratio
			if (width > maxWidth || height > maxHeight) {
				const ratio = Math.min(maxWidth / width, maxHeight / height);
				width = Math.round(width * ratio);
				height = Math.round(height * ratio);
			}

			canvas.width = width;
			canvas.height = height;

			if (!ctx) {
				reject(new Error('Failed to get canvas context'));
				return;
			}

			// Draw and compress
			ctx.drawImage(img, 0, 0, width, height);

			// Use webp for better compression, fallback to jpeg
			let compressedUrl = canvas.toDataURL('image/webp', quality);

			// If webp not supported or larger, try jpeg
			if (compressedUrl.length > canvas.toDataURL('image/jpeg', quality).length) {
				compressedUrl = canvas.toDataURL('image/jpeg', quality);
			}

			resolve(compressedUrl);
		};

		img.onerror = () => reject(new Error('Failed to load image'));
		img.src = URL.createObjectURL(file);
	});
}

export function useFileUpload({ onFileProcessed, acceptedTypes = ['image/'], maxWidth = 1920, maxHeight = 1080, quality = 0.8 }: UseFileUploadOptions) {
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const isValidFileType = useCallback(
		(file: File) => {
			return acceptedTypes.some(type => file.type.startsWith(type));
		},
		[acceptedTypes]
	);

	const processFiles = useCallback(
		async (files: FileList | File[]) => {
			const fileArray = Array.from(files);

			for (const file of fileArray) {
				if (!isValidFileType(file)) continue;

				try {
					const compressedUrl = await compressImage(file, maxWidth, maxHeight, quality);
					await onFileProcessed(compressedUrl, file.name);
				} catch (error) {
					console.error('Failed to process image:', error);
					// Fallback to original if compression fails
					const reader = new FileReader();
					reader.onload = e => {
						const imageUrl = e.target?.result as string;
						onFileProcessed(imageUrl, file.name);
					};
					reader.readAsDataURL(file);
				}
			}
		},
		[isValidFileType, onFileProcessed, maxWidth, maxHeight, quality]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);
			void processFiles(e.dataTransfer.files);
		},
		[processFiles]
	);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const handleFileSelect = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files) {
				void processFiles(e.target.files);
				// Reset input so same file can be selected again
				e.target.value = '';
			}
		},
		[processFiles]
	);

	const openFilePicker = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	return {
		isDragging,
		fileInputRef,
		handleDrop,
		handleDragOver,
		handleDragLeave,
		handleFileSelect,
		openFilePicker,
	};
}
