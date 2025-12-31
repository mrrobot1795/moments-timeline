/**
 * Generate a unique ID for timeline items
 * Combines timestamp with random string for uniqueness
 */
export function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
