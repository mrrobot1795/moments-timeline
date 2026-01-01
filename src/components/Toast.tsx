'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
	message: string;
	type: ToastType;
	onClose: () => void;
	duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: Readonly<ToastProps>) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Trigger enter animation
		requestAnimationFrame(() => setIsVisible(true));

		const timer = setTimeout(() => {
			setIsVisible(false);
			setTimeout(onClose, 300); // Wait for exit animation
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	const bgColor = {
		success: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
		error: 'bg-red-500/20 border-red-500/30 text-red-300',
		info: 'bg-white/10 border-white/20 text-white/80',
	}[type];

	const icon = {
		success: (
			<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
			</svg>
		),
		error: (
			<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
			</svg>
		),
		info: (
			<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
	}[type];

	return (
		<div
			className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-9999
        flex items-center gap-3 px-5 py-3 rounded-xl
        border backdrop-blur-md shadow-lg
        transition-all duration-300 ease-out
        ${bgColor}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
		>
			{icon}
			<span className="font-medium">{message}</span>
		</div>
	);
}
