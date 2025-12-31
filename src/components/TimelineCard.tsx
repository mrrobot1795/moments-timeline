'use client';

import { useState } from 'react';
import type { TimelineItem } from '@/types';
import { formatDate } from '@/utils';
import { CloseIcon, ExpandIcon } from './Icons';
import { ImageLightbox } from './ImageLightbox';

interface TimelineCardProps {
	item: TimelineItem;
	onUpdate: (id: string, updates: { caption?: string; date?: string }) => void;
	onDelete: (id: string) => void;
}

export function TimelineCard({ item, onUpdate, onDelete }: Readonly<TimelineCardProps>) {
	const [isEditing, setIsEditing] = useState(false);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
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

	return (
		<>
			<div className="group relative bg-white/3 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5">
				{/* Image container */}
				<div className="relative aspect-4/3 overflow-hidden">
					<button type="button" onClick={() => setIsLightboxOpen(true)} className="w-full h-full cursor-zoom-in">
						<img
							src={item.imageUrl}
							alt={item.caption || item.fileName}
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

						{/* Expand icon on hover */}
						<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
								<ExpandIcon className="w-6 h-6 text-white" />
							</div>
						</div>
					</button>
					{/* Delete button */}
					<button
						onClick={e => {
							e.stopPropagation();
							onDelete(item.id);
						}}
						className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/80"
					>
						<CloseIcon className="w-4 h-4 text-white" />
					</button>
				</div>

				{/* Caption area */}
				<div className="p-6">
					{isEditing ? (
						<div className="space-y-4">
							<input
								type="date"
								value={editDate}
								onChange={e => setEditDate(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white/80 focus:outline-none focus:border-emerald-400/50"
							/>
							<textarea
								value={editCaption}
								onChange={e => setEditCaption(e.target.value)}
								placeholder="Add a caption..."
								className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/80 resize-none focus:outline-none focus:border-emerald-400/50"
								rows={3}
							/>
							<div className="flex gap-3">
								<button
									onClick={handleSave}
									className="flex-1 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
								>
									Save
								</button>
								<button onClick={handleCancel} className="flex-1 py-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 transition-colors">
									Cancel
								</button>
							</div>
						</div>
					) : (
						<button type="button" onClick={handleStartEditing} className="cursor-pointer w-full text-left">
							<div className="text-emerald-300/80 text-sm font-light tracking-wide mb-2">{formatDate(item.date)}</div>
							{item.caption ? (
								<p className="text-white/70 font-light leading-relaxed">{item.caption}</p>
							) : (
								<p className="text-white/30 italic font-light">Click to add caption...</p>
							)}
						</button>
					)}
				</div>
			</div>
			{/* Lightbox */}
			{isLightboxOpen && <ImageLightbox item={item} onClose={() => setIsLightboxOpen(false)} />}
		</>
	);
}
