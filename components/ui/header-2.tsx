'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { SocialLinks } from '@/components/ui/social-links';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Link } from '@/i18n/navigation';

const PHONE_TEL = '+33646814033';

export function Header() {
	const t = useTranslations('header');
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{ label: t('nav.notreHistoire'), href: '/notre-histoire' },
		{ label: t('nav.tarifs'), href: '/#tarifs' },
		{ label: t('nav.temoignages'), href: '/#temoignages' },
		{ label: t('nav.galerie'), href: '/#galerie' },
		{ label: t('nav.reserver'), href: '/#reservation' },
	];

	React.useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
				{
					'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow':
						scrolled && !open,
					'bg-background/90': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
					{ 'md:px-2': scrolled },
				)}
			>
				<Link href="/" className="flex items-center gap-2 text-primary">
					<HobLogo className="h-7 w-7" />
					<span className="text-base font-semibold tracking-widest">HOB</span>
				</Link>
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link) => (
						<Link
							key={link.href}
							className={buttonVariants({ variant: 'ghost' })}
							href={link.href}
						>
							{link.label}
						</Link>
					))}
					<a className={buttonVariants({ variant: 'default' })} href={`tel:${PHONE_TEL}`}>
						{t('phone')}
					</a>
					<SocialLinks />
					<ThemeToggle />
					<LanguageSwitcher />
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<LanguageSwitcher />
					<Button size="icon" variant="outline" onClick={() => setOpen(!open)}>
						<MenuToggleIcon open={open} className="size-5" duration={300} />
					</Button>
				</div>
			</nav>

			<div
				className={cn(
					'bg-background/95 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<div className="grid gap-y-2">
						{links.map((link) => (
							<Link
								key={link.label}
								onClick={() => setOpen(false)}
								className={buttonVariants({
									variant: 'ghost',
									className: 'justify-start',
								})}
								href={link.href}
							>
								{link.label}
							</Link>
						))}
					</div>
					<div className="flex flex-col gap-2">
						<a
							className={buttonVariants({ variant: 'default', className: 'w-full' })}
							href={`tel:${PHONE_TEL}`}
						>
							{t('phone')}
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}

export const HobLogo = (props: React.ComponentProps<'svg'>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		stroke="currentColor"
		strokeWidth={3}
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M8 50h48" />
		<path d="M12 50c0-12 8-22 20-22s20 10 20 22" />
		<circle cx="32" cy="22" r="3" fill="currentColor" />
		<path d="M32 19V12" />
	</svg>
);
