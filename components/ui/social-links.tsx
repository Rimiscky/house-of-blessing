'use client';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const INSTAGRAM_URL = '#';
const FACEBOOK_URL = '#';

type Props = {
	className?: string;
	size?: 'sm' | 'md';
};

export function SocialLinks({ className, size = 'sm' }: Props) {
	const t = useTranslations('social');
	const sizeClass = size === 'sm' ? 'size-8' : 'size-10';
	const iconClass = size === 'sm' ? 'size-4' : 'size-5';

	return (
		<div className={cn('flex items-center gap-2', className)}>
			<a
				href={INSTAGRAM_URL}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={t('instagram')}
				className={cn(
					'border-border bg-card text-foreground hover:border-primary hover:text-primary flex items-center justify-center rounded-full border transition-colors',
					sizeClass,
				)}
			>
				<svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden>
					<path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.069 4.85-.069zm0 1.946c-3.142 0-3.515.012-4.755.069-1.026.047-1.633.218-2.04.625-.408.408-.578 1.014-.625 2.04-.057 1.24-.069 1.613-.069 4.755s.012 3.515.069 4.755c.047 1.026.218 1.633.625 2.04.408.408 1.014.578 2.04.625 1.24.057 1.613.069 4.755.069s3.515-.012 4.755-.069c1.026-.047 1.633-.218 2.04-.625.408-.408.578-1.014.625-2.04.057-1.24.069-1.613.069-4.755s-.012-3.515-.069-4.755c-.047-1.026-.218-1.633-.625-2.04-.408-.408-1.014-.578-2.04-.625-1.24-.057-1.613-.069-4.755-.069zm0 3.302a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667zm5.338-8.67a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
				</svg>
			</a>
			<a
				href={FACEBOOK_URL}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={t('facebook')}
				className={cn(
					'border-border bg-card text-foreground hover:border-primary hover:text-primary flex items-center justify-center rounded-full border transition-colors',
					sizeClass,
				)}
			>
				<svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden>
					<path d="M22 12.067C22 6.504 17.523 2 12 2S2 6.504 2 12.067c0 5.027 3.657 9.193 8.438 9.94v-7.03H7.898v-2.91h2.54V9.847c0-2.522 1.493-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.776-1.63 1.573v1.888h2.773l-.443 2.91h-2.33V22c4.78-.747 8.437-4.913 8.437-9.933z" />
				</svg>
			</a>
		</div>
	);
}
