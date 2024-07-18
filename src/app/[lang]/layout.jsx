'use client';

// Import necessary libraries and components
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from '../../utils/theme/DefaultColors';
import styled, { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import LanguageSelector from './(DashboardLayout)/components/shared/LanguageSelector';

const GlobalStyle = createGlobalStyle`
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888; /* Scrollbar thumb color */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Scrollbar thumb color on hover */
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Scrollbar track color */
  }
`;

const RootLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname?.split('/')[1] || 'en';  // Default to 'en' if no language in pathname

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'ar,en,fr,de,es,it,zh-CN' },
        'google_translate_element'
      );
    };

    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
      window.googleTranslateElementInit = googleTranslateElementInit;
    };

    // Clean up previous script if it exists
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (existingScript) {
      document.body.removeChild(existingScript);
    }

    addGoogleTranslateScript();

    // Reinitialize Google Translate on language change
    if (window.google && window.google.translate) {
      window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'ar,en,fr,de,es,it,zh-CN' },
        'google_translate_element'
      );
    }

  }, [lang]);

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <GlobalStyle />
          <LanguageSelector />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
