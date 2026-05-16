'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const WHATSAPP_NUMBER = '33646814033';

const inputClass =
	'border-border bg-card/60 text-foreground focus:border-primary focus:ring-primary/30 placeholder:text-muted-foreground/60 w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:ring-2';

export function ReservationForm() {
	const t = useTranslations('reservation');
	const [submitting, setSubmitting] = React.useState(false);

	const eventTypeKeys = ['mariage', 'anniversaire', 'bapteme', 'entreprise', 'cocktail', 'autre'] as const;
	const packageKeys = ['vinDhonneur', 'buffet', 'complete'] as const;

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);
		const form = e.currentTarget;
		const data = new FormData(form);
		const nom = data.get('nom')?.toString().trim() ?? '';
		const telephone = data.get('telephone')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const type = data.get('type')?.toString() ?? '';
		const date = data.get('date')?.toString() ?? '';
		const invites = data.get('invites')?.toString() ?? '';
		const formule = data.get('formule')?.toString() ?? '';
		const message = data.get('message')?.toString().trim() ?? '';

		const lines = [
			t('whatsappIntro'),
			'',
			`• ${t('whatsappFields.name')} : ${nom}`,
			`• ${t('whatsappFields.phone')} : ${telephone}`,
			email && `• ${t('whatsappFields.email')} : ${email}`,
			`• ${t('whatsappFields.type')} : ${type}`,
			`• ${t('whatsappFields.date')} : ${date}`,
			`• ${t('whatsappFields.guests')} : ${invites}`,
			`• ${t('whatsappFields.package')} : ${formule}`,
			message && '',
			message && `${t('whatsappMessageLabel')} :\n${message}`,
		].filter(Boolean);

		const text = encodeURIComponent(lines.join('\n'));
		const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
		window.open(url, '_blank', 'noopener,noreferrer');
		setSubmitting(false);
	};

	return (
		<form
			onSubmit={onSubmit}
			className="border-border bg-card mx-auto grid max-w-3xl gap-4 rounded-2xl border p-6 md:p-10 md:grid-cols-2"
		>
			<Field label={t('form.name')} required>
				<input
					name="nom"
					type="text"
					required
					placeholder={t('form.namePlaceholder')}
					className={inputClass}
				/>
			</Field>
			<Field label={t('form.phone')} required>
				<input
					name="telephone"
					type="tel"
					required
					placeholder={t('form.phonePlaceholder')}
					className={inputClass}
				/>
			</Field>
			<Field label={t('form.email')} className="md:col-span-2">
				<input
					name="email"
					type="email"
					placeholder={t('form.emailPlaceholder')}
					className={inputClass}
				/>
			</Field>
			<Field label={t('form.type')} required>
				<select name="type" required defaultValue="" className={cn(inputClass, 'appearance-none')}>
					<option value="" disabled>
						{t('form.select')}
					</option>
					{eventTypeKeys.map((k) => (
						<option key={k} value={t(`eventTypes.${k}`)}>
							{t(`eventTypes.${k}`)}
						</option>
					))}
				</select>
			</Field>
			<Field label={t('form.date')} required>
				<input name="date" type="date" required className={inputClass} />
			</Field>
			<Field label={t('form.guests')} required>
				<input
					name="invites"
					type="number"
					min={1}
					required
					placeholder={t('form.guestsPlaceholder')}
					className={inputClass}
				/>
			</Field>
			<Field label={t('form.package')} required>
				<select
					name="formule"
					required
					defaultValue=""
					className={cn(inputClass, 'appearance-none')}
				>
					<option value="" disabled>
						{t('form.select')}
					</option>
					{packageKeys.map((k) => (
						<option key={k} value={t(`packages.${k}`)}>
							{t(`packages.${k}`)}
						</option>
					))}
				</select>
			</Field>
			<Field label={t('form.messageOptional')} className="md:col-span-2">
				<textarea
					name="message"
					rows={4}
					placeholder={t('form.messagePlaceholder')}
					className={cn(inputClass, 'resize-y')}
				/>
			</Field>
			<div className="md:col-span-2 flex flex-col gap-2 pt-2">
				<Button type="submit" size="lg" className="w-full" disabled={submitting}>
					{submitting ? t('form.submitting') : t('form.submit')}
				</Button>
				<p className="text-muted-foreground/70 text-center text-xs">{t('form.footerNote')}</p>
			</div>
		</form>
	);
}

function Field({
	label,
	children,
	required,
	className,
}: {
	label: string;
	children: React.ReactNode;
	required?: boolean;
	className?: string;
}) {
	return (
		<label className={cn('flex flex-col gap-2', className)}>
			<span className="text-foreground text-sm font-medium tracking-wide">
				{label}
				{required && <span className="text-primary ml-1">*</span>}
			</span>
			{children}
		</label>
	);
}
