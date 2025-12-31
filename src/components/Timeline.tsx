'use client';

import type { TimelineItem } from '@/types';
import { formatShortDate } from '@/utils';
import { TimelineCard } from './TimelineCard';

interface TimelineProps {
	items: TimelineItem[];
	onUpdateItem: (id: string, updates: { caption?: string; date?: string }) => void;
	onDeleteItem: (id: string) => void;
}

export function Timeline({ items, onUpdateItem, onDeleteItem }: Readonly<TimelineProps>) {
	if (items.length === 0) return null;

	return (
		<section aria-label="Image timeline" className="relative z-10 w-full max-w-7xl pt-16 pb-32">
			{/* Timeline line - centered */}
			<div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-emerald-500/20 to-transparent" />

			<div className="w-full px-6">
				{items.map((item, index) => {
					const isEven = index % 2 === 0;

					return (
						<div
							key={item.id}
							className="relative grid grid-cols-[1fr_4rem_1fr] mb-24 last:mb-0"
							style={{
								animation: 'fadeSlideIn 0.6s ease-out forwards',
								animationDelay: `${index * 0.1}s`,
								opacity: 0,
							}}
						>
							{/* Left side */}
							<div className={`flex ${isEven ? 'justify-end pr-6' : 'justify-end items-center pr-6'}`}>
								{isEven ? (
									<div className="w-full max-w-lg">
										<TimelineCard item={item} onUpdate={onUpdateItem} onDelete={onDeleteItem} />
									</div>
								) : (
									<span className="text-white/20 text-sm font-light tracking-widest uppercase">{formatShortDate(item.date)}</span>
								)}
							</div>

							{/* Timeline dot (center) */}
							<div className="flex items-center justify-center">
								<div className="relative">
									<div className="w-4 h-4 rounded-full bg-linear-to-br from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/30" />
									<div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
								</div>
							</div>

							{/* Right side */}
							<div className={`flex ${isEven ? 'justify-start items-center pl-6' : 'justify-start pl-6'}`}>
								{isEven ? (
									<span className="text-white/20 text-sm font-light tracking-widest uppercase">{formatShortDate(item.date)}</span>
								) : (
									<div className="w-full max-w-lg">
										<TimelineCard item={item} onUpdate={onUpdateItem} onDelete={onDeleteItem} />
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
