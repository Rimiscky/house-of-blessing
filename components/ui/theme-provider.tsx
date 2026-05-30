'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
	theme: Theme;
	resolvedTheme: 'light' | 'dark';
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
	theme: 'system',
	resolvedTheme: 'dark',
	setTheme: () => {},
});

export function useTheme() {
	return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>('system');
	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

	useEffect(() => {
		const stored = localStorage.getItem('hob-theme') as Theme | null;
		if (stored === 'light' || stored === 'dark' || stored === 'system') {
			setThemeState(stored);
		}
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		const mq = window.matchMedia('(prefers-color-scheme: dark)');

		const apply = (t: Theme) => {
			const resolved = t === 'system' ? (mq.matches ? 'dark' : 'light') : t;
			setResolvedTheme(resolved);
			root.classList.toggle('dark', resolved === 'dark');
		};

		apply(theme);

		if (theme === 'system') {
			const handler = () => apply('system');
			mq.addEventListener('change', handler);
			return () => mq.removeEventListener('change', handler);
		}
	}, [theme]);

	const setTheme = (t: Theme) => {
		localStorage.setItem('hob-theme', t);
		setThemeState(t);
	};

	return (
		<ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
