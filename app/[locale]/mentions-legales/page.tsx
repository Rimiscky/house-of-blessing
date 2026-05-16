import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "mentionsLegales" });
	return { title: `${t("title")} — House Of Blessing` };
}

export default async function MentionsLegalesPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("mentionsLegales");

	const today = new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date());

	const editorRows = [
		["company", "companyValue"],
		["legalForm", "legalFormValue"],
		["capital", "capitalValue"],
		["siret", "siretValue"],
		["address", "addressValue"],
		["phone", "phoneValue"],
		["email", "emailValue"],
		["director", "directorValue"],
	] as const;

	return (
		<main className="mx-auto max-w-3xl px-6 py-24 md:py-32">
			<h1 className="text-foreground text-4xl font-light tracking-tight md:text-5xl">
				{t("title")}
			</h1>
			<p className="text-muted-foreground mt-3 text-sm">
				{t("lastUpdated", { date: today })}
			</p>

			<div className="border-primary/30 bg-primary/5 text-foreground/80 mt-10 rounded-lg border p-4 text-sm">
				⚠️ {t("placeholderNote")}
			</div>

			<Section title={t("editor.title")}>
				<dl className="grid gap-3 sm:grid-cols-[180px_1fr]">
					{editorRows.map(([labelKey, valueKey]) => (
						<React.Fragment key={labelKey}>
							<dt className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
								{t(`editor.${labelKey}`)}
							</dt>
							<dd className="text-foreground text-sm">{t(`editor.${valueKey}`)}</dd>
						</React.Fragment>
					))}
				</dl>
			</Section>

			<Section title={t("host.title")}>
				<p>{t("host.body")}</p>
			</Section>

			<Section title={t("ip.title")}>
				<p>{t("ip.body")}</p>
			</Section>

			<Section title={t("data.title")}>
				<p>{t("data.body1")}</p>
				<p>{t("data.body2")}</p>
				<p>{t("data.body3")}</p>
			</Section>

			<Section title={t("cookies.title")}>
				<p>{t("cookies.body")}</p>
			</Section>

			<Section title={t("credits.title")}>
				<p>{t("credits.body")}</p>
			</Section>
		</main>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className="border-border/40 mt-12 border-t pt-8">
			<h2 className="text-foreground text-2xl font-light italic md:text-3xl">{title}</h2>
			<div className="text-foreground/85 mt-6 space-y-3 text-sm leading-relaxed md:text-base">
				{children}
			</div>
		</section>
	);
}
