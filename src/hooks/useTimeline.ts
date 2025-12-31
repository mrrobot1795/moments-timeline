'use client';

import { useState, useCallback, useEffect } from 'react';
import type { TimelineItem, CreateTimelineItem, UpdateTimelineItem } from '@/types';

interface UseTimelineReturn {
	items: TimelineItem[];
	isLoading: boolean;
	error: string | null;
	addItem: (imageUrl: string, fileName: string) => Promise<void>;
	updateItem: (id: string, updates: UpdateTimelineItem) => Promise<void>;
	deleteItem: (id: string) => Promise<void>;
	clearError: () => void;
}

export function useTimeline(isAuthenticated: boolean): UseTimelineReturn {
	const [items, setItems] = useState<TimelineItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchItems() {
			if (!isAuthenticated) {
				setIsLoading(false);
				return;
			}

			try {
				setIsLoading(true);
				const response = await fetch('/api/timeline');
				if (!response.ok) throw new Error('Failed to fetch');
				const data: TimelineItem[] = await response.json();
				setItems(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load timeline');
				console.error('Failed to fetch timeline:', err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchItems();
	}, [isAuthenticated]);

	const addItem = useCallback(async (imageUrl: string, fileName: string) => {
		try {
			const newItem: CreateTimelineItem = {
				imageUrl,
				caption: '',
				date: new Date().toISOString().split('T')[0],
				fileName,
			};

			const response = await fetch('/api/timeline', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newItem),
			});

			if (!response.ok) throw new Error('Failed to create');

			const createdItem: TimelineItem = await response.json();
			setItems(prev => [...prev, createdItem].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
		} catch (err) {
			console.error('Failed to add item:', err);
			setError('Failed to add image');
		}
	}, []);

	const updateItem = useCallback(async (id: string, updates: UpdateTimelineItem) => {
		try {
			const response = await fetch(`/api/timeline/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updates),
			});

			if (!response.ok) throw new Error('Failed to update');

			setItems(prev =>
				prev.map(item => (item.id === id ? { ...item, ...updates } : item)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
			);
		} catch (err) {
			console.error('Failed to update item:', err);
			setError('Failed to update image');
		}
	}, []);

	const deleteItem = useCallback(async (id: string) => {
		try {
			const response = await fetch(`/api/timeline/${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) throw new Error('Failed to delete');

			setItems(prev => prev.filter(item => item.id !== id));
		} catch (err) {
			console.error('Failed to delete item:', err);
			setError('Failed to delete image');
		}
	}, []);

	const clearError = useCallback(() => setError(null), []);

	return {
		items,
		isLoading,
		error,
		addItem,
		updateItem,
		deleteItem,
		clearError,
	};
}
