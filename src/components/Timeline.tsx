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
			{/* Timeline line - animated gradient */}
			<div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
				<div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-500/30 to-transparent" />
				<div className="absolute inset-0 bg-linear-to-b from-emerald-400/0 via-emerald-400/50 to-emerald-400/0 animate-pulse" />
			</div>

			<div className="w-full px-6">
				{items.map((item, index) => {
					const isEven = index % 2 === 0;

					return (
						<div
							key={item.id}
							className="relative grid grid-cols-[1fr_4rem_1fr] mb-24 last:mb-0 group/row"
							style={{
								animation: 'fadeSlideIn 0.6s ease-out forwards',
								animationDelay: `${index * 0.15}s`,
								opacity: 0,
							}}
						>
							{/* Connector line */}
							<div
								className={`absolute top-1/2 h-px bg-linear-to-r ${
									isEven
										? 'right-1/2 left-6 from-transparent via-emerald-500/20 to-emerald-500/40'
										: 'left-1/2 right-6 from-emerald-500/40 via-emerald-500/20 to-transparent'
								} -translate-y-1/2 opacity-30 sm:opacity-0 sm:group-hover/row:opacity-100 transition-opacity duration-500`}
							/>

							{/* Left side */}
							<div className={`flex ${isEven ? 'justify-end pr-6' : 'justify-end items-center pr-6'}`}>
								{isEven ? (
									<div className="w-full max-w-lg transform transition-transform duration-500 active:scale-[0.98] sm:hover:scale-[1.02]">
										<TimelineCard item={item} items={items} onUpdate={onUpdateItem} onDelete={onDeleteItem} />
									</div>
								) : (
									<span className="text-emerald-400/30 sm:text-white/20 text-sm font-light tracking-widest uppercase transition-colors duration-300 sm:group-hover/row:text-emerald-400/40">
										{formatShortDate(item.date)}
									</span>
								)}
							</div>

							{/* Timeline dot */}
							<div className="flex items-center justify-center">
								<div className="relative">
									<div className="absolute -inset-2 rounded-full bg-emerald-400/20 opacity-50 sm:opacity-0 sm:group-hover/row:opacity-100 transition-all duration-500 sm:group-hover/row:scale-150" />
									<div className="relative w-5 h-5 sm:w-4 sm:h-4 rounded-full bg-linear-to-br from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/30 transition-transform duration-300 sm:group-hover/row:scale-125" />
									<div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
									<div className="absolute inset-0.5 rounded-full bg-linear-to-br from-white/30 to-transparent" />
								</div>
							</div>

							{/* Right side */}
							<div className={`flex ${isEven ? 'justify-start items-center pl-6' : 'justify-start pl-6'}`}>
								{isEven ? (
									<span className="text-emerald-400/30 sm:text-white/20 text-sm font-light tracking-widest uppercase transition-colors duration-300 sm:group-hover/row:text-emerald-400/40">
										{formatShortDate(item.date)}
									</span>
								) : (
									<div className="w-full max-w-lg transform transition-transform duration-500 active:scale-[0.98] sm:hover:scale-[1.02]">
										<TimelineCard item={item} items={items} onUpdate={onUpdateItem} onDelete={onDeleteItem} />
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
