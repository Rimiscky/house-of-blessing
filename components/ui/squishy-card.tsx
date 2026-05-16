'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export type SquishyCardProps = {
	name: string;
	price: string;
	unit: string;
	description: string;
	rows?: { label: string; price: string }[];
	featured?: boolean;
	ctaHref: string;
	ctaLabel?: string;
};

export function SquishyCard({
	name,
	price,
	unit,
	description,
	rows,
	featured,
	ctaHref,
	ctaLabel,
}: SquishyCardProps) {
	const t = useTranslations('tarifs');
	const resolvedCtaLabel = ctaLabel ?? t('reserve');
	const recommendedLabel = t('recommended');
	const isFilled = !!featured;

	const cardBg = isFilled ? 'bg-primary' : 'bg-card border border-border';
	const textColor = isFilled ? 'text-primary-foreground' : 'text-foreground';
	const subTextColor = isFilled ? 'text-primary-foreground/80' : 'text-muted-foreground';
	const priceColor = isFilled ? 'text-primary-foreground' : 'text-primary';
	const circleFill = isFilled ? 'rgba(255,255,255,0.16)' : 'oklch(0.09 0 0)';
	const badgeStyle = isFilled
		? 'bg-background/20 text-primary-foreground'
		: 'bg-primary/15 text-primary border border-primary/30';
	const buttonStyle = isFilled
		? 'border-background bg-background text-foreground hover:bg-background/0 hover:text-background'
		: 'border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary';

	return (
		<motion.div
			whileHover="hover"
			initial="rest"
			animate="rest"
			transition={{ duration: 1, ease: 'backInOut' }}
			variants={{ hover: { scale: 1.05 } }}
			className={cn(
				'relative h-[30rem] w-full max-w-80 shrink-0 overflow-hidden rounded-2xl p-8 shadow-xl',
				cardBg,
			)}
		>
			<Background fill={circleFill} />

			<div className={cn('relative z-10 flex h-full flex-col', textColor)}>
				{featured && (
					<span
						className={cn(
							'mb-4 self-start rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase',
							badgeStyle,
						)}
					>
						{recommendedLabel}
					</span>
				)}

				<h3 className={cn('text-xl font-semibold italic', textColor)}>{name}</h3>

				<motion.div
					initial={{ scale: 0.88 }}
					variants={{ hover: { scale: 1 } }}
					transition={{ duration: 1, ease: 'backInOut' }}
					className="mt-3 origin-top-left"
				>
					<span className={cn('text-6xl font-black leading-none', priceColor)}>{price}</span>
					<span className={cn('ml-1 text-base font-light', subTextColor)}>{unit}</span>
				</motion.div>

				<p className={cn('mt-5 text-sm leading-relaxed', subTextColor)}>{description}</p>

				{rows && (
					<ul className={cn('mt-5 space-y-1.5 text-xs', subTextColor)}>
						{rows.map((row) => (
							<li key={row.label} className="flex items-center justify-between gap-2">
								<span>{row.label}</span>
								<span className={cn('font-semibold', textColor)}>{row.price}</span>
							</li>
						))}
					</ul>
				)}
			</div>

			<a
				href={ctaHref}
				className={cn(
					'absolute right-6 bottom-6 left-6 z-20 flex items-center justify-center rounded-lg border-2 py-3 text-sm font-medium tracking-wider uppercase transition-colors',
					buttonStyle,
				)}
			>
				{resolvedCtaLabel}
			</a>
		</motion.div>
	);
}

function Background({ fill }: { fill: string }) {
	return (
		<motion.svg
			width="320"
			height="480"
			viewBox="0 0 320 480"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="absolute inset-0 z-0 h-full w-full"
			variants={{ hover: { scale: 1.4 } }}
			transition={{ duration: 1, ease: 'backInOut' }}
			aria-hidden
		>
			<motion.circle
				variants={{ hover: { scaleY: 0.5, y: -25 } }}
				transition={{ duration: 1, ease: 'backInOut', delay: 0.2 }}
				cx="160"
				cy="100"
				r="115"
				fill={fill}
			/>
			<motion.ellipse
				variants={{ hover: { scaleY: 2.25, y: -25 } }}
				transition={{ duration: 1, ease: 'backInOut', delay: 0.2 }}
				cx="160"
				cy="380"
				rx="130"
				ry="55"
				fill={fill}
			/>
		</motion.svg>
	);
}
