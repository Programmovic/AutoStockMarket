'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from '../../utils/theme/DefaultColors';
import styled, { createGlobalStyle } from 'styled-components';
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

const ClientProvider = ({ children, locale, messages }) => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: locale || 'en', includedLanguages: 'ar,en,fr,de,es,it,zh-CN' },
        'google_translate_element'
      );
    };

    const addGoogleTranslateScript = () => {
      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) return;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.id = 'google-translate-script';
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider theme={baselightTheme}>
        <CssBaseline />
        <GlobalStyle />
        <div id="google_translate_element"></div>
        <LanguageSelector />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default ClientProvider;
