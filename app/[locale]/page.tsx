import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { ReservationForm } from "@/components/ui/reservation-form";
import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { StickyScrollGallery } from "@/components/ui/sticky-scroll";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import { SquishyCard } from "@/components/ui/squishy-card";
import { CalendarEmbed } from "@/components/ui/calendar-section";
import { HobLogo } from "@/components/ui/header-2";
import { SocialLinks } from "@/components/ui/social-links";
import { Link } from "@/i18n/navigation";

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<>
			<CinematicHero />
			<Tarifs />
			<Temoignages />
			<Equipe />
			<Galerie />
			<Calendar />
			<Reservation />
			<Footer />
		</>
	);
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
	return (
		<Reveal className="mb-12 text-center md:mb-16">
			<p className="text-primary mb-3 text-xs font-medium tracking-[0.4em] uppercase">
				{eyebrow}
			</p>
			<h2 className="text-foreground text-3xl font-light tracking-tight md:text-5xl">{title}</h2>
		</Reveal>
	);
}

async function Tarifs() {
	const t = await getTranslations("tarifs");
	const formules = [
		{
			key: "vinDhonneur",
			name: t("formules.vinDhonneur.name"),
			price: "20€",
			unit: t("formules.vinDhonneur.unit"),
			description: t("formules.vinDhonneur.description"),
			rows: [
				{ label: t("formules.vinDhonneur.rowLess"), price: "20€/pers" },
				{ label: t("formules.vinDhonneur.rowMore"), price: "15€/pers" },
			],
		},
		{
			key: "formuleComplete",
			name: t("formules.formuleComplete.name"),
			price: "50€",
			unit: t("formules.formuleComplete.unit"),
			description: t("formules.formuleComplete.description"),
			featured: true,
		},
		{
			key: "buffet",
			name: t("formules.buffet.name"),
			price: "30€",
			unit: t("formules.buffet.unit"),
			description: t("formules.buffet.description"),
		},
	];

	return (
		<section id="tarifs" className="border-border/40 border-t py-24 md:py-32">
			<div className="mx-auto max-w-6xl px-6">
				<SectionTitle eyebrow={t("eyebrow")} title={t("title")} />
				<div className="flex flex-wrap items-stretch justify-center gap-6 md:gap-8">
					{formules.map((f, i) => (
						<Reveal key={f.key} delay={i * 120} className="flex w-full max-w-80 justify-center">
							<SquishyCard
								name={f.name}
								price={f.price}
								unit={f.unit}
								description={f.description}
								rows={f.rows}
								featured={f.featured}
								ctaHref="#reservation"
							/>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

type LocalizedTemoignage = {
	name: string;
	occasion: string;
	body: string;
	city: string;
};

const UNSPLASH = (id: string) =>
	`https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&crop=faces&q=80&auto=format`;

const TESTIMONIAL_AVATARS = [
	UNSPLASH("1508002366005-75a695ee2d17"),
	UNSPLASH("1534470717-233b39a41c54"),
	UNSPLASH("1518882570151-157128e78fa1"),
	UNSPLASH("1509099955921-f0b4ed0c175c"),
	UNSPLASH("1605980776566-0486c3ac7617"),
	UNSPLASH("1562173650-f61426fbe683"),
	UNSPLASH("1655902588583-f7f2dab6b6a0"),
	UNSPLASH("1564541558234-ef406c118d0c"),
	UNSPLASH("1714118657863-2843a622718b"),
];

async function Temoignages() {
	const t = await getTranslations("temoignages");
	const items = t.raw("items") as LocalizedTemoignage[];
	const temoignages = items.map((item, i) => ({
		...item,
		img: TESTIMONIAL_AVATARS[i] ?? TESTIMONIAL_AVATARS[0],
	}));
	return (
		<section id="temoignages" className="border-border/40 border-t py-24 md:py-32">
			<div className="mx-auto max-w-6xl px-6">
				<SectionTitle eyebrow={t("eyebrow")} title={t("title")} />
				<Reveal>
					<TestimonialsCarousel temoignages={temoignages} />
				</Reveal>
			</div>
		</section>
	);
}

async function Equipe() {
	const t = await getTranslations("equipe");
	return (
		<section id="equipe" className="border-border/40 border-t py-24 md:py-32">
			<div className="mx-auto max-w-5xl px-6">
				<SectionTitle eyebrow={t("eyebrow")} title={t("title")} />
				<div className="grid gap-10 md:grid-cols-2 md:items-center">
					<Reveal className="border-border bg-card group relative aspect-[4/5] overflow-hidden rounded-xl border">
						<Image
							src="/Photos/Fondratrices.jpeg"
							alt={t("altFondatrices")}
							fill
							sizes="(min-width: 768px) 50vw, 100vw"
							className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
						/>
					</Reveal>
					<Reveal delay={150}>
						<h3 className="text-foreground text-2xl font-light italic md:text-3xl">
							{t("historyHeading")}
						</h3>
						<p className="text-muted-foreground mt-6 leading-relaxed">{t("historyP1")}</p>
						<p className="text-muted-foreground mt-4 leading-relaxed">{t("historyP2")}</p>
					</Reveal>
				</div>

				<div className="mt-16 grid gap-10 md:grid-cols-2 md:items-center">
					<Reveal className="md:order-2 border-border bg-card group relative aspect-[4/5] overflow-hidden rounded-xl border">
						<Image
							src="/Photos/equipes.jpeg"
							alt={t("altEquipe")}
							fill
							sizes="(min-width: 768px) 50vw, 100vw"
							className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
						/>
					</Reveal>
					<Reveal delay={150} className="md:order-1">
						<h3 className="text-foreground text-2xl font-light italic md:text-3xl">
							{t("serviceHeading")}
						</h3>
						<p className="text-muted-foreground mt-6 leading-relaxed">{t("serviceP")}</p>
					</Reveal>
				</div>
			</div>
		</section>
	);
}

async function Galerie() {
	const t = await getTranslations("galerie");
	return (
		<section id="galerie" className="border-border/40 border-t py-24 md:py-32">
			<div className="mx-auto max-w-6xl px-6">
				<SectionTitle eyebrow={t("eyebrow")} title={t("title")} />
			</div>
			<div className="mx-auto max-w-7xl px-4 md:px-6">
				<StickyScrollGallery />
			</div>
		</section>
	);
}

async function Calendar() {
	const t = await getTranslations("calendar");
	return (
		<section id="rendez-vous" className="border-border/40 border-t py-24 md:py-32">
			<div className="mx-auto max-w-6xl px-6">
				<SectionTitle eyebrow={t("eyebrow")} title={t("title")} />
				<Reveal>
					<p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center leading-relaxed">
						{t("subtitle")}
					</p>
				</Reveal>
				<Reveal delay={100}>
					<CalendarEmbed />
				</Reveal>
			</div>
		</section>
	);
}

async function Reservation() {
	const t = await getTranslations("reservation");
	return (
		<section id="reservation" className="border-border/40 border-t py-24 md:py-32">
			<div className="mx-auto max-w-5xl px-6">
				<SectionTitle eyebrow={t("eyebrow")} title={t("title")} />
				<Reveal>
					<p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center leading-relaxed">
						{t("intro")}
					</p>
				</Reveal>
				<Reveal delay={100}>
					<ReservationForm />
				</Reveal>
			</div>
		</section>
	);
}

async function Footer() {
	const t = await getTranslations("footer");
	const tHeader = await getTranslations("header");

	const navLinks = [
		{ label: tHeader("nav.notreHistoire"), href: "/notre-histoire" },
		{ label: tHeader("nav.tarifs"), href: "/#tarifs" },
		{ label: tHeader("nav.temoignages"), href: "/#temoignages" },
		{ label: tHeader("nav.galerie"), href: "/#galerie" },
		{ label: tHeader("nav.reserver"), href: "/#reservation" },
	];

	return (
		<footer className="border-border/40 border-t py-16 md:py-20">
			<div className="mx-auto max-w-6xl px-6">
				<div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_auto]">
					<div className="space-y-4">
						<Link href="/" className="text-primary inline-flex items-center gap-2">
							<HobLogo className="h-8 w-8" />
							<span className="text-lg font-semibold tracking-widest">HOB</span>
						</Link>
						<p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
							{t("tagline")}
						</p>
					</div>
					<div>
						<h3 className="text-foreground mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
							{t("navHeading")}
						</h3>
						<ul className="space-y-2">
							{navLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-muted-foreground hover:text-primary text-sm transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="text-foreground mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
							{t("legalHeading")}
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/mentions-legales"
									className="text-muted-foreground hover:text-primary text-sm transition-colors"
								>
									{t("mentionsLegales")}
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<h3 className="text-foreground text-xs font-semibold tracking-[0.2em] uppercase">
							{tHeader("phone")}
						</h3>
						<SocialLinks size="md" />
					</div>
				</div>
				<div className="border-border/30 mt-12 border-t pt-6">
					<p className="text-muted-foreground/70 text-center text-xs tracking-wider">
						{t("copyright", { year: new Date().getFullYear() })}
					</p>
				</div>
			</div>
		</footer>
	);
}
