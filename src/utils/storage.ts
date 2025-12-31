import type { TimelineItem } from '@/types';

const STORAGE_KEY = 'timeline-items';

/**
 * Load timeline items from localStorage
 */
export function loadTimelineItems(): TimelineItem[] {
	if (typeof window === 'undefined') return [];

	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			return JSON.parse(saved);
		}
	} catch (e) {
		console.error('Failed to load saved items:', e);
	}
	return [];
}

/**
 * Save timeline items to localStorage
 */
export function saveTimelineItems(items: TimelineItem[]): void {
	if (typeof window === 'undefined') return;

	try {
		if (items.length > 0) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
	} catch (e) {
		console.error('Failed to save items:', e);
	}
}

/**
 * Clear all timeline items from localStorage
 */
export function clearTimelineItems(): void {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(STORAGE_KEY);
}
