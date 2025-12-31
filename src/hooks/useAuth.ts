'use client';

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/types';

interface UseAuthReturn {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
	logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const checkAuth = useCallback(async () => {
		try {
			const response = await fetch('/api/auth/me');
			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
				return true;
			} else {
				setUser(null);
				return false;
			}
		} catch (error) {
			console.error('Auth check failed:', error);
			setUser(null);
			return false;
		}
	}, []);

	useEffect(() => {
		checkAuth().finally(() => setIsLoading(false));
	}, [checkAuth]);

	const login = useCallback(async (email: string, password: string, rememberMe: boolean = false) => {
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password, rememberMe }),
			});

			const data = await response.json();
			if (data.success && data.user) {
				setUser(data.user);
			}
			return { success: data.success, error: data.error };
		} catch {
			return { success: false, error: 'Login failed' };
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setUser(null);
		}
	}, []);

	return {
		user,
		isLoading,
		isAuthenticated: !!user,
		login,
		logout,
	};
}
