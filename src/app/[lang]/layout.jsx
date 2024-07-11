'use client';

// Import necessary libraries and components
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from '../../utils/theme/DefaultColors';
import styled, { createGlobalStyle } from 'styled-components';

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
  const { lang } = "router.query";

  return (
    <html lang={lang || 'en'} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
