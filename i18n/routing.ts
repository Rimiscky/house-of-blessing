import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	locales: ['fr', 'en', 'ar'],
	defaultLocale: 'fr',
	localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

export const localeMetadata: Record<Locale, { label: string; flag: string; dir: 'ltr' | 'rtl' }> = {
	fr: { label: 'Français', flag: '🇫🇷', dir: 'ltr' },
	en: { label: 'English', flag: '🇬🇧', dir: 'ltr' },
	ar: { label: 'العربية', flag: '🇸🇦', dir: 'rtl' },
};
