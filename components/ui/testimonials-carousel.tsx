'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';
import { cn } from '@/lib/utils';

export type Temoignage = {
	name: string;
	occasion: string;
	body: string;
	img: string;
	city: string;
};

type Props = {
	temoignages: Temoignage[];
};

export function TestimonialsCarousel({ temoignages }: Props) {
	const t = useTranslations('temoignages');
	const [openIndex, setOpenIndex] = React.useState<number | null>(null);
	const onSelect = React.useCallback((i: number) => setOpenIndex(i), []);
	const onClose = React.useCallback(() => setOpenIndex(null), []);

	const renderColumn = (reverse: boolean) => (
		<Marquee vertical pauseOnHover reverse={reverse} repeat={3} className="[--duration:60s]">
			{temoignages.map((t, i) => (
				<TestimonialCard key={t.name} temoignage={t} onClick={() => onSelect(i)} />
			))}
		</Marquee>
	);

	return (
		<>
			<div className="border-border bg-card/30 relative mx-auto flex h-[600px] w-full max-w-5xl flex-row items-center justify-center overflow-hidden rounded-2xl border [perspective:300px]">
				<div
					className="flex flex-row items-center gap-4"
					style={{
						transform:
							'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
					}}
				>
					{renderColumn(false)}
					{renderColumn(true)}
					{renderColumn(false)}
					{renderColumn(true)}
				</div>
				<div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b" />
				<div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
				<div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
				<div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
			</div>
			<p className="text-muted-foreground/70 mt-6 text-center text-xs tracking-wider uppercase">
				{t('hint')}
			</p>

			<TestimonialDialog
				temoignage={openIndex === null ? null : temoignages[openIndex]}
				onClose={onClose}
			/>
		</>
	);
}

function TestimonialCard({
	temoignage,
	onClick,
}: {
	temoignage: Temoignage;
	onClick: () => void;
}) {
	const { img, name, occasion, body, city } = temoignage;
	return (
		<Card
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick();
				}
			}}
			className="hover:border-primary/60 w-64 cursor-pointer shadow-lg transition-colors"
		>
			<CardContent className="p-5">
				<div className="flex items-center gap-2.5">
					<Avatar className="size-9">
						<AvatarImage src={img} alt={name} />
						<AvatarFallback>{name[0]}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<figcaption className="text-foreground flex items-center gap-1 text-sm font-medium">
							{name} <span className="text-xs">{city}</span>
						</figcaption>
						<p className="text-muted-foreground text-xs font-medium">{occasion}</p>
					</div>
				</div>
				<blockquote className="text-foreground/90 mt-3 line-clamp-3 text-sm leading-relaxed italic">
					« {body} »
				</blockquote>
			</CardContent>
		</Card>
	);
}

function TestimonialDialog({
	temoignage,
	onClose,
}: {
	temoignage: Temoignage | null;
	onClose: () => void;
}) {
	const t = useTranslations('temoignages');
	React.useEffect(() => {
		if (!temoignage) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prev;
		};
	}, [temoignage, onClose]);

	if (!temoignage) return null;
	const { img, name, occasion, body, city } = temoignage;

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label={t('dialogAriaLabel', { name })}
			onClick={onClose}
			className="bg-background/95 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md"
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

			<div
				onClick={(e) => e.stopPropagation()}
				className={cn(
					'border-border bg-card relative w-full max-w-2xl rounded-2xl border p-8 shadow-2xl md:p-12',
					'motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-300',
				)}
			>
				<svg
					className="text-primary/30 mb-4 size-12"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden
				>
					<path d="M7.17 12.32c0-1.47.32-2.79.96-3.96.64-1.17 1.6-2.05 2.88-2.64l1.04 1.92c-.91.43-1.55.96-1.92 1.6-.37.64-.56 1.41-.56 2.32h2.4v6.08H7.17v-5.32zm9.6 0c0-1.47.32-2.79.96-3.96.64-1.17 1.6-2.05 2.88-2.64l1.04 1.92c-.91.43-1.55.96-1.92 1.6-.37.64-.56 1.41-.56 2.32h2.4v6.08h-4.8v-5.32z" />
				</svg>

				<blockquote className="text-foreground text-lg leading-relaxed italic md:text-2xl">
					{body}
				</blockquote>

				<div className="border-border/40 mt-8 flex items-center gap-4 border-t pt-6">
					<Avatar className="size-14 md:size-16">
						<AvatarImage src={img} alt={name} />
						<AvatarFallback className="text-lg">{name[0]}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<p className="text-foreground text-lg font-semibold md:text-xl">{name}</p>
						<p className="text-muted-foreground text-sm">
							{occasion} <span className="ml-1">{city}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
