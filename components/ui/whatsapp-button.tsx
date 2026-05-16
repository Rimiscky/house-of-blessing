import { getTranslations } from 'next-intl/server';

const WHATSAPP_NUMBER = '33646814033';

export async function WhatsAppButton() {
	const t = await getTranslations('whatsapp');
	const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('defaultMessage'))}`;
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={t('ariaLabel')}
			className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:bottom-8 md:right-8 md:h-16 md:w-16"
		>
			<span
				aria-hidden
				className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping"
			/>
			<svg
				viewBox="0 0 24 24"
				fill="currentColor"
				className="relative size-7 md:size-8"
				aria-hidden
			>
				<path d="M20.52 3.48A11.93 11.93 0 0 0 12.02 0C5.46 0 .12 5.34.12 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.32-1.66a11.9 11.9 0 0 0 5.7 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.4-8.41Zm-8.5 18.31h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.75.98 1-3.66-.23-.37a9.86 9.86 0 0 1-1.51-5.24c0-5.45 4.44-9.89 9.9-9.89 2.65 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.89 7c0 5.45-4.44 9.88-9.9 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9.04 9.04 0 0 1-1.67-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.34Z" />
			</svg>
			<span className="sr-only">WhatsApp</span>
		</a>
	);
}
