import React from 'react';
import { getTranslations } from 'next-intl/server';
import { buttonVariants } from '@/components/ui/button';

const CHAR_STEP = 0.055;
const BASE_DELAY = 0.45;

const VIDEO_PRIMARY = '/Photos/hero-video.mp4';
const VIDEO_FALLBACK = '/Photos/hero-fallback.mp4';
const POSTER =
	'/Photos/people-group-catering-buffet-food-indoor-in-luxury-2026-04-14-00-15-54-utc.jpg';

function AnimatedWord({ text, baseDelay }: { text: string; baseDelay: number }) {
	return (
		<span className="inline-block">
			{Array.from(text).map((char, i) => (
				<span
					key={i}
					className="hob-char-in inline-block"
					style={{ animationDelay: `${baseDelay + i * CHAR_STEP}s` }}
				>
					{char === ' ' ? ' ' : char}
				</span>
			))}
		</span>
	);
}

const BUBBLE_OFFSETS = [
	{ left: '6%', delay: '0s', duration: '11s', size: 'size-2' },
	{ left: '14%', delay: '2.4s', duration: '13s', size: 'size-1.5' },
	{ left: '22%', delay: '4.1s', duration: '10s', size: 'size-2.5' },
	{ left: '32%', delay: '1.2s', duration: '14s', size: 'size-1' },
	{ left: '41%', delay: '5.6s', duration: '12s', size: 'size-2' },
	{ left: '48%', delay: '3.3s', duration: '11s', size: 'size-1.5' },
	{ left: '57%', delay: '6.8s', duration: '13s', size: 'size-2' },
	{ left: '64%', delay: '0.8s', duration: '10s', size: 'size-1' },
	{ left: '72%', delay: '4.7s', duration: '14s', size: 'size-2.5' },
	{ left: '81%', delay: '2.1s', duration: '12s', size: 'size-1.5' },
	{ left: '88%', delay: '5.2s', duration: '11s', size: 'size-2' },
	{ left: '94%', delay: '3.9s', duration: '13s', size: 'size-1' },
];

export async function CinematicHero() {
	const t = await getTranslations('hero');
	const titleLine1 = t('titleLine1');
	const titleLine2 = t('titleLine2');

	return (
		<section
			id="hero"
			className="relative -mt-14 flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-background md:-mt-12"
		>
			<video
				autoPlay
				loop
				muted
				playsInline
				preload="metadata"
				poster={POSTER}
				className="absolute inset-0 h-full w-full object-cover"
				aria-hidden
			>
				<source src={VIDEO_PRIMARY} type="video/mp4" />
				<source src={VIDEO_FALLBACK} type="video/mp4" />
			</video>

			<div className="from-background/85 via-background/55 to-background absolute inset-0 bg-gradient-to-b" />
			<div
				className="absolute inset-0"
				style={{
					background:
						'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.4) 100%)',
				}}
			/>

			<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
				{BUBBLE_OFFSETS.map((b, i) => (
					<span
						key={i}
						className={`hob-bubble bg-primary/50 absolute bottom-[-10px] ${b.size} rounded-full blur-[1px]`}
						style={{
							left: b.left,
							animationDelay: b.delay,
							animationDuration: b.duration,
						}}
					/>
				))}
			</div>

			<div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-24 text-center md:pt-32">
				<p
					className="hob-fade-up text-primary mb-6 text-xs font-medium tracking-[0.4em] uppercase"
					style={{ animationDelay: '0.2s' }}
				>
					{t('eyebrow')}
				</p>

				<h1 className="text-foreground font-extrabold tracking-tighter leading-[0.82] text-[clamp(3.5rem,12vw,11rem)]">
					<span className="block uppercase">
						<AnimatedWord text={titleLine1} baseDelay={BASE_DELAY} />
					</span>
					<span className="text-primary relative mt-1 block font-bold italic">
						<AnimatedWord
							text={titleLine2}
							baseDelay={BASE_DELAY + titleLine1.length * CHAR_STEP + 0.1}
						/>
						<span
							aria-hidden
							className="hob-line-draw bg-primary absolute -bottom-3 left-1/2 h-[4px] w-[55%] -translate-x-1/2 origin-left md:-bottom-5 md:h-[6px]"
							style={{
								animationDelay: `${BASE_DELAY + (titleLine1.length + titleLine2.length) * CHAR_STEP + 0.25}s`,
							}}
						/>
					</span>
				</h1>

				<p
					className="hob-fade-up text-foreground/85 mx-auto mt-10 max-w-xl text-base leading-relaxed md:text-lg"
					style={{ animationDelay: '1.9s' }}
				>
					{t('subtitle')}
				</p>

				<div
					className="hob-fade-up mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
					style={{ animationDelay: '2.2s' }}
				>
					<a
						href="#tarifs"
						className={`${buttonVariants({ variant: 'default', size: 'lg' })} group/cta shadow-primary/30 relative overflow-hidden shadow-lg`}
					>
						<span className="relative z-10">{t('ctaPrimary')}</span>
						<span className="from-primary/0 via-primary-foreground/30 to-primary/0 absolute inset-0 -translate-x-full bg-gradient-to-r transition-transform duration-700 group-hover/cta:translate-x-full" />
					</a>
					<a
						href="#reservation"
						className={`${buttonVariants({ variant: 'outline', size: 'lg' })} bg-background/30 backdrop-blur-sm`}
					>
						{t('ctaSecondary')}
					</a>
				</div>
			</div>

			<div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
				<div className="hob-float text-primary/70 flex flex-col items-center gap-2">
					<span className="text-[10px] tracking-[0.3em] uppercase">{t('discover')}</span>
					<svg
						className="size-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden
					>
						<path d="M12 5v14M19 12l-7 7-7-7" />
					</svg>
				</div>
			</div>
		</section>
	);
}
