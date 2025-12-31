'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './Icons';
import type { TimelineItem } from '@/types';
import { formatDate } from '@/utils';

interface ImageLightboxProps {
	item: TimelineItem;
	onClose: () => void;
}

export function ImageLightbox({ item, onClose }: ImageLightboxProps) {
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [handleKeyDown]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const lightboxContent = (
		<div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95" onClick={handleBackdropClick}>
			{/* Close button */}
			<button
				type="button"
				onClick={onClose}
				className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
			>
				<CloseIcon className="w-6 h-6 text-white" />
			</button>

			{/* Image and caption container */}
			<div className="flex flex-col items-center max-w-[90vw] max-h-[90vh]">
				<img src={item.imageUrl} alt={item.caption || item.fileName} className="max-w-full max-h-[75vh] object-contain rounded-lg" />

				{/* Caption */}
				<div className="mt-6 text-center px-4">
					<p className="text-emerald-300/80 text-sm font-light tracking-wide mb-2">{formatDate(item.date)}</p>
					{item.caption && <p className="text-white/90 font-light text-lg max-w-2xl">{item.caption}</p>}
				</div>
			</div>
		</div>
	);

	// Portal renders outside the component tree, avoiding z-index issues
	if (globalThis.window !== undefined) {
		return createPortal(lightboxContent, document.body);
	}

	return null;
}
