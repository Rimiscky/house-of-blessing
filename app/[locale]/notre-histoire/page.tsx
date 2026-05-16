import { getTranslations, setRequestLocale } from "next-intl/server";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

const BLACK = "#0a0a0a";
const GOLD = "#c4a04f";
const CREAM = "#F5F0E8";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "notreHistoire" });
	return {
		title: t("ariaLabel"),
		description: t("section1.body"),
	};
}

export default async function NotreHistoirePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("notreHistoire");

	return (
		<FlowArt aria-label={t("ariaLabel")}>
			<FlowSection aria-label={t("section1.aria")} style={{ backgroundColor: BLACK, color: CREAM }}>
				<p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
					{t("section1.eyebrow")}
				</p>
				<hr className="my-[2vw] border-none border-t" style={{ borderColor: `${GOLD}80` }} />
				<div>
					<h1 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
						{t("section1.line1")}
						<br />
						{t("section1.line2")}
						<br />
						{t("section1.line3")}
					</h1>
				</div>
				<hr className="my-[2vw] border-none border-t" style={{ borderColor: `${GOLD}80` }} />
				<p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
					{t("section1.body")}
				</p>
			</FlowSection>

			<FlowSection aria-label={t("section2.aria")} style={{ backgroundColor: CREAM, color: BLACK }}>
				<p className="text-xs font-bold uppercase tracking-[0.2em]">{t("section2.eyebrow")}</p>
				<hr className="my-[2vw] border-none border-t border-black/60" />
				<div>
					<h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
						{t("section2.line1")}
						<br />
						{t("section2.line2")}
						<br />
						{t("section2.line3")}
					</h2>
				</div>
				<hr className="my-[2vw] border-none border-t border-black/60" />
				<p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
					{t("section2.body")}
				</p>
				<hr className="my-[2vw] border-none border-t border-black/60" />
				<div className="flex flex-wrap gap-[3vw]">
					{[1, 2, 3].map((n) => (
						<div key={n} className="min-w-[180px] flex-1">
							<p className="mb-2 text-sm font-bold uppercase tracking-wider">
								{t(`section2.card${n}Title`)}
							</p>
							<p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
								{t(`section2.card${n}Body`)}
							</p>
						</div>
					))}
				</div>
			</FlowSection>

			<FlowSection aria-label={t("section3.aria")} style={{ backgroundColor: GOLD, color: BLACK }}>
				<p className="text-xs font-bold uppercase tracking-[0.2em]">{t("section3.eyebrow")}</p>
				<hr className="my-[2vw] border-none border-t border-black/40" />
				<div>
					<h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
						{t("section3.line1")}
						<br />
						{t("section3.line2")}
						<br />
						{t("section3.line3")}
					</h2>
				</div>
				<hr className="my-[2vw] border-none border-t border-black/40" />
				<p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
					{t("section3.body")}
				</p>
				<hr className="my-[2vw] border-none border-t border-black/40" />
				<div className="flex flex-wrap gap-[3vw]">
					{[1, 2, 3].map((n) => (
						<div key={n} className="min-w-[180px] flex-1">
							<p className="mb-2 text-sm font-bold uppercase tracking-wider">
								{t(`section3.card${n}Title`)}
							</p>
							<p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
								{t(`section3.card${n}Body`)}
							</p>
						</div>
					))}
				</div>
			</FlowSection>

			<FlowSection aria-label={t("section4.aria")} style={{ backgroundColor: BLACK, color: CREAM }}>
				<p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
					{t("section4.eyebrow")}
				</p>
				<hr className="my-[2vw] border-none border-t" style={{ borderColor: `${GOLD}80` }} />
				<div>
					<h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
						{t("section4.line1")}
						<br />
						{t("section4.line2")}
						<br />
						{t("section4.line3")}
					</h2>
				</div>
				<hr className="my-[2vw] border-none border-t" style={{ borderColor: `${GOLD}80` }} />
				<p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
					{t("section4.body")}
				</p>
				<hr className="my-[2vw] border-none border-t" style={{ borderColor: `${GOLD}80` }} />
				<div className="flex flex-wrap gap-[3vw]">
					{[1, 2, 3].map((n) => (
						<div key={n} className="min-w-[180px] flex-1">
							<p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: GOLD }}>
								{t(`section4.card${n}Title`)}
							</p>
							<p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
								{t(`section4.card${n}Body`)}
							</p>
						</div>
					))}
				</div>
				<hr className="my-[2vw] border-none border-t" style={{ borderColor: `${GOLD}80` }} />
				<p className="ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
					{t("section4.closing")}
				</p>
			</FlowSection>

			<FlowSection aria-label={t("section5.aria")} style={{ backgroundColor: CREAM, color: BLACK }}>
				<p className="text-xs font-bold uppercase tracking-[0.2em]">{t("section5.eyebrow")}</p>
				<hr className="my-[2vw] border-none border-t border-black/60" />
				<div>
					<h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
						{t("section5.line1")}
						<br />
						{t("section5.line2")}
						<br />
						{t("section5.line3")}
					</h2>
				</div>
				<hr className="my-[2vw] border-none border-t border-black/60" />
				<p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
					{t("section5.body")}
				</p>
				<div className="mt-auto flex flex-wrap items-center gap-4">
					<a
						href="/#reservation"
						className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-medium uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5"
					>
						{t("section5.ctaPrimary")}
					</a>
					<a
						href="tel:+33646814033"
						className="inline-flex items-center justify-center rounded-xl border border-black px-8 py-4 text-base font-medium tracking-wide transition-colors hover:bg-black hover:text-white"
					>
						+33 6 46 81 40 33
					</a>
				</div>
			</FlowSection>
		</FlowArt>
	);
}
