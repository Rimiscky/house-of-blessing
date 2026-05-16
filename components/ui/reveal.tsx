'use client';
import React from 'react';
import { cn } from '@/lib/utils';

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
	delay?: number;
	as?: 'div' | 'section' | 'article';
};

export function Reveal({
	children,
	className,
	delay = 0,
	as: Tag = 'div',
	...props
}: RevealProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const [visible, setVisible] = React.useState(false);

	React.useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<Tag
			ref={ref as React.RefObject<HTMLDivElement>}
			style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
			className={cn(
				'motion-safe:transition-all motion-safe:duration-[900ms] motion-safe:ease-out',
				visible
					? 'opacity-100 motion-safe:translate-y-0'
					: 'opacity-0 motion-safe:translate-y-8',
				className,
			)}
			{...props}
		>
			{children}
		</Tag>
	);
}
