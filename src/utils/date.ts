/**
 * Format a date string to a human-readable format
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

/**
 * Format a date string to short month/year format
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Short formatted date (e.g., "Jan 2024")
 */
export function formatShortDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric',
	});
}

/**
 * Get today's date in ISO format
 * @returns Today's date as YYYY-MM-DD
 */
export function getTodayISO(): string {
	return new Date().toISOString().split('T')[0];
}

/**
 * Sort timeline items by date ascending
 */
export function sortByDate<T extends { date: string }>(items: T[]): T[] {
	return [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
