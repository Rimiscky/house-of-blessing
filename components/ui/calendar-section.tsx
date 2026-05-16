'use client';
import React from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useTranslations } from 'next-intl';

const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME ?? '';
const CAL_EVENT = process.env.NEXT_PUBLIC_CAL_EVENT ?? 'consultation';
const WHATSAPP_NUMBER = '33646814033';
const PHONE_TEL = '+33646814033';

export function CalendarEmbed() {
	const isConfigured = CAL_USERNAME.length > 0;

	React.useEffect(() => {
		if (!isConfigured) return;
		(async () => {
			const cal = await getCalApi();
			cal('ui', {
				theme: 'dark',
				styles: { branding: { brandColor: '#c4a04f' } },
				hideEventTypeDetails: false,
				layout: 'month_view',
			});
		})();
	}, [isConfigured]);

	if (!isConfigured) {
		return <CalendarPlaceholder />;
	}

	return (
		<div className="border-border bg-card mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border shadow-xl">
			<Cal
				calLink={`${CAL_USERNAME}/${CAL_EVENT}`}
				style={{ width: '100%', height: '650px', overflow: 'scroll' }}
				config={{ layout: 'month_view' }}
			/>
		</div>
	);
}

function CalendarPlaceholder() {
	const t = useTranslations('calendar');
	return (
		<div className="border-border bg-card mx-auto flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border p-8 text-center shadow-xl md:p-12">
			<div className="bg-primary/10 ring-primary/30 flex h-16 w-16 items-center justify-center rounded-full ring-2">
				<svg
					className="text-primary size-8"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.8}
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
				>
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
					<line x1="16" y1="2" x2="16" y2="6" />
					<line x1="8" y1="2" x2="8" y2="6" />
					<line x1="3" y1="10" x2="21" y2="10" />
					<circle cx="12" cy="16" r="1.5" fill="currentColor" />
				</svg>
			</div>
			<div>
				<h3 className="text-foreground text-xl font-semibold md:text-2xl">
					{t('placeholderTitle')}
				</h3>
				<p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed md:text-base">
					{t('placeholderBody')}
				</p>
			</div>
			<div className="flex flex-col gap-3 sm:flex-row">
				<a
					href={`https://wa.me/${WHATSAPP_NUMBER}`}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
						<path d="M20.52 3.48A11.93 11.93 0 0 0 12.02 0C5.46 0 .12 5.34.12 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.32-1.66a11.9 11.9 0 0 0 5.7 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.4-8.41Z" />
					</svg>
					{t('placeholderWhatsapp')}
				</a>
				<a
					href={`tel:${PHONE_TEL}`}
					className="border-primary text-primary hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center gap-2 rounded-lg border-2 px-5 py-3 text-sm font-medium transition-colors"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className="size-4"
						aria-hidden
					>
						<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
					</svg>
					{t('placeholderPhone')}
				</a>
			</div>
		</div>
	);
}
