'use client';

import { useState, useCallback, useRef } from 'react';

interface UseFileUploadOptions {
	onFileProcessed: (imageUrl: string, fileName: string) => void;
	acceptedTypes?: string[];
}

export function useFileUpload({ onFileProcessed, acceptedTypes = ['image/'] }: UseFileUploadOptions) {
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const isValidFileType = useCallback(
		(file: File) => {
			return acceptedTypes.some(type => file.type.startsWith(type));
		},
		[acceptedTypes]
	);

	const processFiles = useCallback(
		(files: FileList | File[]) => {
			const fileArray = Array.from(files);

			fileArray.forEach(file => {
				if (!isValidFileType(file)) return;

				const reader = new FileReader();
				reader.onload = e => {
					const imageUrl = e.target?.result as string;
					onFileProcessed(imageUrl, file.name);
				};
				reader.readAsDataURL(file);
			});
		},
		[isValidFileType, onFileProcessed]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);
			processFiles(e.dataTransfer.files);
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
				processFiles(e.target.files);
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
