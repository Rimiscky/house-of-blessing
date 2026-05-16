'use client';
import React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing, localeMetadata, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
	const locale = useLocale() as Locale;
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', onClick);
		return () => document.removeEventListener('mousedown', onClick);
	}, []);

	const changeLocale = (newLocale: Locale) => {
		router.replace(pathname, { locale: newLocale });
		setOpen(false);
	};

	const current = localeMetadata[locale];

	return (
		<div ref={ref} className={cn('relative', className)}>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="listbox"
				aria-expanded={open}
				className="border-border bg-background/40 text-foreground hover:bg-muted flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors"
			>
				<span aria-hidden>{current.flag}</span>
				<span>{locale.toUpperCase()}</span>
				<svg
					className={cn('size-3 transition-transform', open && 'rotate-180')}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>
			{open && (
				<ul
					role="listbox"
					className="border-border bg-card text-foreground absolute right-0 mt-1 w-36 overflow-hidden rounded-md border shadow-lg"
				>
					{routing.locales.map((l) => {
						const meta = localeMetadata[l];
						const active = l === locale;
						return (
							<li key={l}>
								<button
									type="button"
									role="option"
									aria-selected={active}
									onClick={() => changeLocale(l)}
									className={cn(
										'hover:bg-muted flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
										active && 'bg-muted text-primary font-medium',
									)}
								>
									<span aria-hidden>{meta.flag}</span>
									<span>{meta.label}</span>
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
