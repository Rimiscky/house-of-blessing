'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type PhotoLightboxProps = {
	photos: string[];
	openIndex: number | null;
	onClose: () => void;
	onPrev: () => void;
	onNext: () => void;
};

export function PhotoLightbox({
	photos,
	openIndex,
	onClose,
	onPrev,
	onNext,
}: PhotoLightboxProps) {
	const t = useTranslations('lightbox');
	React.useEffect(() => {
		if (openIndex === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			else if (e.key === 'ArrowLeft') onPrev();
			else if (e.key === 'ArrowRight') onNext();
		};
		document.addEventListener('keydown', onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prev;
		};
	}, [openIndex, onClose, onPrev, onNext]);

	if (openIndex === null) return null;
	const src = photos[openIndex];

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label={t('alt')}
			onClick={onClose}
			className="bg-background/95 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md"
		>
			<button
				type="button"
				aria-label={t('close')}
				onClick={(e) => {
					e.stopPropagation();
					onClose();
				}}
				className="bg-card/80 text-foreground hover:bg-card focus-visible:ring-primary/40 absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 md:right-8 md:top-8"
			>
				<svg
					className="size-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
				>
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>

			<button
				type="button"
				aria-label={t('previous')}
				onClick={(e) => {
					e.stopPropagation();
					onPrev();
				}}
				className="bg-card/80 text-foreground hover:bg-card focus-visible:ring-primary/40 absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 md:left-8"
			>
				<svg
					className="size-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
				>
					<path d="M15 18l-6-6 6-6" />
				</svg>
			</button>

			<button
				type="button"
				aria-label={t('next')}
				onClick={(e) => {
					e.stopPropagation();
					onNext();
				}}
				className="bg-card/80 text-foreground hover:bg-card focus-visible:ring-primary/40 absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-4 md:right-8"
			>
				<svg
					className="size-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
				>
					<path d="M9 18l6-6-6-6" />
				</svg>
			</button>

			<div
				key={src}
				onClick={(e) => e.stopPropagation()}
				className="motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-300 relative h-[80svh] w-[88vw] max-w-6xl"
			>
				<Image
					src={src}
					alt={t('alt')}
					fill
					sizes="90vw"
					priority
					className="object-contain"
				/>
			</div>

			<p
				onClick={(e) => e.stopPropagation()}
				className="bg-card/80 text-foreground absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-sm font-medium tracking-wider"
			>
				{openIndex + 1} / {photos.length}
			</p>
		</div>
	);
}
