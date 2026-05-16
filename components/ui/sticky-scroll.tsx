'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { PhotoLightbox } from '@/components/ui/photo-lightbox';

type Category = 'mariage' | 'pro' | 'prive';
type Filter = 'all' | Category;
type Position = 'left' | 'middle' | 'right';

type Photo = { src: string; category: Category; position: Position };

const PHOTOS: Photo[] = [
	{ src: '/Photos/snacks-with-shrimps-spoons-buffet-table.jpg', category: 'mariage', position: 'left' },
	{ src: '/Photos/mini-canapes-with-smoked-salmon-buffet-table.jpg', category: 'pro', position: 'left' },
	{ src: '/Photos/canapes-with-fried-berries-arugula-bread-side-view.jpg', category: 'mariage', position: 'left' },
	{ src: '/Photos/catering-food-meal-canape.jpg', category: 'prive', position: 'left' },
	{ src: '/Photos/delicious-meat-snacks-with-sauce-buffet-table.jpg', category: 'pro', position: 'left' },
	{ src: '/Photos/front-view-delicious-food-concept.jpg', category: 'pro', position: 'middle' },
	{ src: '/Photos/high-angle-delicious-food-concept.jpg', category: 'prive', position: 'middle' },
	{ src: '/Photos/pexels-elina-sazonova-4206592.jpg', category: 'mariage', position: 'middle' },
	{ src: '/Photos/pexels-filirovska-8250716.jpg', category: 'mariage', position: 'right' },
	{ src: '/Photos/pexels-naimbic-2291367.jpg', category: 'prive', position: 'right' },
	{ src: '/Photos/pexels-qaarif-16074401.jpg', category: 'prive', position: 'right' },
	{ src: '/Photos/pexels-berlinerlights-23858842.jpg', category: 'prive', position: 'right' },
	{ src: '/Photos/pexels-kevin-yung-2152346613-36892251.jpg', category: 'pro', position: 'right' },
];

const FILTER_KEYS: Filter[] = ['all', 'mariage', 'pro', 'prive'];

const imgClass = 'object-cover transition-transform duration-500 group-hover:scale-105';

export function StickyScrollGallery() {
	const t = useTranslations('galerie');
	const [filter, setFilter] = React.useState<Filter>('all');
	const [openIndex, setOpenIndex] = React.useState<number | null>(null);

	const visiblePhotos = React.useMemo(
		() => (filter === 'all' ? PHOTOS : PHOTOS.filter((p) => p.category === filter)),
		[filter],
	);
	const lightboxSources = React.useMemo(() => visiblePhotos.map((p) => p.src), [visiblePhotos]);

	const onClose = React.useCallback(() => setOpenIndex(null), []);
	const onPrev = React.useCallback(
		() =>
			setOpenIndex((i) =>
				i === null ? null : (i - 1 + lightboxSources.length) % lightboxSources.length,
			),
		[lightboxSources.length],
	);
	const onNext = React.useCallback(
		() =>
			setOpenIndex((i) => (i === null ? null : (i + 1) % lightboxSources.length)),
		[lightboxSources.length],
	);

	const changeFilter = (f: Filter) => {
		setOpenIndex(null);
		setFilter(f);
	};

	const labelFor = (n: number) => t('openLabel', { n });

	return (
		<>
			<div className="mb-10 flex flex-wrap items-center justify-center gap-2 md:gap-3">
				{FILTER_KEYS.map((f) => {
					const active = filter === f;
					return (
						<button
							key={f}
							type="button"
							onClick={() => changeFilter(f)}
							aria-pressed={active}
							className={cn(
								'rounded-full border px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors md:text-sm',
								active
									? 'bg-primary text-primary-foreground border-primary'
									: 'border-border bg-card text-foreground hover:border-primary/60',
							)}
						>
							{t(`filters.${f}`)}
						</button>
					);
				})}
			</div>

			{filter === 'all' ? (
				<StickyLayout onOpen={setOpenIndex} alts={makeAlts(t)} labelFor={labelFor} />
			) : (
				<FilteredGrid
					photos={visiblePhotos}
					onOpen={setOpenIndex}
					alts={makeAlts(t)}
					labelFor={labelFor}
				/>
			)}

			<PhotoLightbox
				photos={lightboxSources}
				openIndex={openIndex}
				onClose={onClose}
				onPrev={onPrev}
				onNext={onNext}
			/>
		</>
	);
}

type Alts = { left: string; middle: string; right: string };

function makeAlts(t: (key: string) => string): Alts {
	return {
		left: t('altBuffet'),
		middle: t('altPreparation'),
		right: t('altReception'),
	};
}

function StickyLayout({
	onOpen,
	alts,
	labelFor,
}: {
	onOpen: (i: number) => void;
	alts: Alts;
	labelFor: (n: number) => string;
}) {
	const left = PHOTOS.filter((p) => p.position === 'left');
	const middle = PHOTOS.filter((p) => p.position === 'middle');
	const right = PHOTOS.filter((p) => p.position === 'right');

	let cursor = 0;
	const indexedLeft = left.map((p) => ({ ...p, index: cursor++ }));
	const indexedMiddle = middle.map((p) => ({ ...p, index: cursor++ }));
	const indexedRight = right.map((p) => ({ ...p, index: cursor++ }));

	return (
		<div className="grid grid-cols-1 gap-2 md:grid-cols-12">
			<div className="grid gap-2 md:col-span-4">
				{indexedLeft.map((p) => (
					<PhotoButton
						key={p.src}
						src={p.src}
						alt={alts.left}
						onClick={() => onOpen(p.index)}
						label={labelFor(p.index + 1)}
						priority={p.index === 0}
					/>
				))}
			</div>
			<div className="grid gap-2 md:col-span-4 md:sticky md:top-0 md:h-screen md:grid-rows-3">
				{indexedMiddle.map((p) => (
					<PhotoButton
						key={p.src}
						src={p.src}
						alt={alts.middle}
						onClick={() => onOpen(p.index)}
						label={labelFor(p.index + 1)}
						fillHeight
					/>
				))}
			</div>
			<div className="grid gap-2 md:col-span-4">
				{indexedRight.map((p) => (
					<PhotoButton
						key={p.src}
						src={p.src}
						alt={alts.right}
						onClick={() => onOpen(p.index)}
						label={labelFor(p.index + 1)}
					/>
				))}
			</div>
		</div>
	);
}

function FilteredGrid({
	photos,
	onOpen,
	alts,
	labelFor,
}: {
	photos: Photo[];
	onOpen: (i: number) => void;
	alts: Alts;
	labelFor: (n: number) => string;
}) {
	if (photos.length === 0) {
		return <FilteredEmpty />;
	}
	return (
		<div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
			{photos.map((p, i) => (
				<PhotoButton
					key={p.src}
					src={p.src}
					alt={alts[p.position]}
					onClick={() => onOpen(i)}
					label={labelFor(i + 1)}
					priority={i === 0}
				/>
			))}
		</div>
	);
}

function FilteredEmpty() {
	const t = useTranslations('galerie');
	return (
		<div className="border-border bg-card mx-auto rounded-2xl border p-12 text-center">
			<p className="text-muted-foreground text-sm">{t('empty')}</p>
		</div>
	);
}

function PhotoButton({
	src,
	alt,
	onClick,
	label,
	fillHeight,
	priority,
}: {
	src: string;
	alt: string;
	onClick: () => void;
	label: string;
	fillHeight?: boolean;
	priority?: boolean;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={label}
			className={cn(
				'group relative w-full h-96 overflow-hidden rounded-md cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
				fillHeight && 'md:h-full',
			)}
		>
			<Image
				src={src}
				alt={alt}
				fill
				sizes="(min-width: 768px) 33vw, 50vw"
				priority={priority}
				className={imgClass}
			/>
		</button>
	);
}

export default StickyScrollGallery;
