import { notFound } from 'next/navigation';
import ClientProvider from './ClientProvider';

const loadMessages = async (locale) => {
  const url = `https://api.i18nexus.com/project_resources/translations/${locale}.json?api_key=${process.env.I18NEXUS_API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: false }
  });

  if (!res.ok) {
    throw new Error('Failed to load messages');
  }

  return res.json();
};

const RootLayout = async ({ children, params: { locale } }) => {
  let messages;
  try {
    messages = await loadMessages(locale);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <ClientProvider locale={locale} messages={messages}>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
