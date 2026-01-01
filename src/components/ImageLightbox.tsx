'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './Icons';
import type { TimelineItem } from '@/types';
import { formatDate } from '@/utils';

interface ImageLightboxProps {
	item: TimelineItem;
	items: TimelineItem[];
	onClose: () => void;
	onNavigate: (item: TimelineItem) => void;
}

function ChevronLeftIcon({ className }: Readonly<{ className?: string }>) {
	return (
		<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
		</svg>
	);
}

function ChevronRightIcon({ className }: Readonly<{ className?: string }>) {
	return (
		<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
		</svg>
	);
}

export function ImageLightbox({ item, items, onClose, onNavigate }: ImageLightboxProps) {
	const currentIndex = items.findIndex(i => i.id === item.id);
	const hasPrev = currentIndex > 0;
	const hasNext = currentIndex < items.length - 1;

	const goToPrev = useCallback(() => {
		if (hasPrev) {
			onNavigate(items[currentIndex - 1]);
		}
	}, [hasPrev, items, currentIndex, onNavigate]);

	const goToNext = useCallback(() => {
		if (hasNext) {
			onNavigate(items[currentIndex + 1]);
		}
	}, [hasNext, items, currentIndex, onNavigate]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowLeft') goToPrev();
			if (e.key === 'ArrowRight') goToNext();
		},
		[onClose, goToPrev, goToNext]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [handleKeyDown]);

	// Touch swipe handling
	useEffect(() => {
		let touchStartX = 0;
		let touchEndX = 0;

		const handleTouchStart = (e: TouchEvent) => {
			touchStartX = e.changedTouches[0].screenX;
		};

		const handleTouchEnd = (e: TouchEvent) => {
			touchEndX = e.changedTouches[0].screenX;
			const diff = touchStartX - touchEndX;

			if (Math.abs(diff) > 50) {
				if (diff > 0) goToNext();
				else goToPrev();
			}
		};

		document.addEventListener('touchstart', handleTouchStart);
		document.addEventListener('touchend', handleTouchEnd);

		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchend', handleTouchEnd);
		};
	}, [goToNext, goToPrev]);

	const lightboxContent = (
		<div className="fixed inset-0 z-9999">
			{/* Backdrop */}
			<button type="button" onClick={onClose} aria-label="Close image preview" className="absolute inset-0 w-full h-full bg-black/95 cursor-default" />

			{/* Close button */}
			<button
				type="button"
				onClick={onClose}
				className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
			>
				<CloseIcon className="w-6 h-6 text-white" />
			</button>

			{/* Navigation arrows */}
			{hasPrev && (
				<button
					type="button"
					onClick={goToPrev}
					className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10 active:scale-95"
				>
					<ChevronLeftIcon className="w-6 h-6 text-white" />
				</button>
			)}

			{hasNext && (
				<button
					type="button"
					onClick={goToNext}
					className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10 active:scale-95"
				>
					<ChevronRightIcon className="w-6 h-6 text-white" />
				</button>
			)}

			{/* Image and caption container */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4 sm:p-16">
				<div className="flex flex-col items-center max-w-full max-h-full pointer-events-auto">
					<img
						src={item.imageUrl}
						alt={item.caption || item.fileName}
						className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-lg"
					/>

					{/* Caption */}
					<div className="mt-4 sm:mt-6 text-center px-4">
						<p className="text-emerald-300/80 text-sm font-light tracking-wide mb-1 sm:mb-2">{formatDate(item.date)}</p>
						{item.caption && <p className="text-white/90 font-light text-base sm:text-lg max-w-2xl">{item.caption}</p>}
						{/* Image counter */}
						<p className="text-white/40 text-sm mt-3">
							{currentIndex + 1} of {items.length}
						</p>
					</div>
				</div>
			</div>
		</div>
	);

	if (globalThis.window !== undefined) {
		return createPortal(lightboxContent, document.body);
	}

	return null;
}
