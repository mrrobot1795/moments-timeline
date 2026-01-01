'use client';

import { useState } from 'react';
import type { TimelineItem } from '@/types';
import { formatDate } from '@/utils';
import { CloseIcon } from './Icons';
import { ImageLightbox } from './ImageLightbox';

interface TimelineCardProps {
	item: TimelineItem;
	items: TimelineItem[];
	onUpdate: (id: string, updates: { caption?: string; date?: string }) => void;
	onDelete: (id: string) => void;
}

export function TimelineCard({ item, items, onUpdate, onDelete }: Readonly<TimelineCardProps>) {
	const [isEditing, setIsEditing] = useState(false);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [lightboxItem, setLightboxItem] = useState(item);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [editCaption, setEditCaption] = useState(item.caption);
	const [editDate, setEditDate] = useState(item.date);

	const handleStartEditing = () => {
		setIsEditing(true);
		setEditCaption(item.caption);
		setEditDate(item.date);
	};

	const handleSave = () => {
		onUpdate(item.id, { caption: editCaption, date: editDate });
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditCaption(item.caption);
		setEditDate(item.date);
	};

	const handleOpenLightbox = () => {
		setLightboxItem(item);
		setIsLightboxOpen(true);
	};

	const handleNavigate = (newItem: TimelineItem) => {
		setLightboxItem(newItem);
	};

	return (
		<>
			<div className="group relative bg-white/3 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 sm:border-white/5 sm:hover:border-emerald-500/20 transition-all duration-500 sm:hover:shadow-2xl sm:hover:shadow-emerald-500/10 active:scale-[0.99]">
				{/* Image container */}
				<div className="relative aspect-4/3 overflow-hidden bg-white/5">
					{/* Skeleton loader */}
					{!isImageLoaded && (
						<div className="absolute inset-0 bg-linear-to-r from-white/5 via-white/10 to-white/5 bg-size-[200%_100%] animate-shimmer" />
					)}

					<button type="button" onClick={handleOpenLightbox} className="w-full h-full cursor-zoom-in active:opacity-90 block">
						<img
							src={item.imageUrl}
							alt={item.caption || item.fileName}
							onLoad={() => setIsImageLoaded(true)}
							className={`w-full h-full object-cover transition-all duration-700 sm:group-hover:scale-105 ${
								isImageLoaded ? 'opacity-100' : 'opacity-0'
							}`}
						/>
					</button>

					{/* Delete button */}
					<button
						type="button"
						onClick={e => {
							e.stopPropagation();
							onDelete(item.id);
						}}
						className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center sm:opacity-40 sm:group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 active:bg-red-600 active:scale-95 z-10"
					>
						<CloseIcon className="w-4 h-4 text-white" />
					</button>
				</div>

				{/* Caption area */}
				<div className="p-4 sm:p-5">
					{isEditing ? (
						<div className="space-y-3">
							<input
								type="date"
								value={editDate}
								onChange={e => setEditDate(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/80 text-base focus:outline-none focus:border-emerald-400/50 transition-all"
							/>
							<textarea
								value={editCaption}
								onChange={e => setEditCaption(e.target.value)}
								placeholder="Add a caption..."
								className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/80 text-base resize-none focus:outline-none focus:border-emerald-400/50 transition-all"
								rows={3}
							/>
							<div className="flex gap-3">
								<button
									type="button"
									onClick={handleSave}
									className="flex-1 py-3 rounded-lg bg-emerald-500/20 text-emerald-300 active:bg-emerald-500/40 sm:hover:bg-emerald-500/30 transition-all duration-300 font-medium"
								>
									Save
								</button>
								<button
									type="button"
									onClick={handleCancel}
									className="flex-1 py-3 rounded-lg bg-white/5 text-white/50 active:bg-white/15 sm:hover:bg-white/10 transition-all duration-300"
								>
									Cancel
								</button>
							</div>
						</div>
					) : (
						<button type="button" onClick={handleStartEditing} className="w-full text-left active:opacity-80">
							<div className="text-emerald-300/80 text-sm font-light tracking-wide mb-1">{formatDate(item.date)}</div>
							{item.caption ? (
								<p className="text-white/70 font-light leading-relaxed">{item.caption}</p>
							) : (
								<p className="text-white/40 italic font-light">Tap to add caption...</p>
							)}
						</button>
					)}
				</div>
			</div>

			{/* Lightbox */}
			{isLightboxOpen && <ImageLightbox item={lightboxItem} items={items} onClose={() => setIsLightboxOpen(false)} onNavigate={handleNavigate} />}
		</>
	);
}
