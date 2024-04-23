'use client';

// Import necessary libraries and components
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from '../../utils/theme/DefaultColors';

const RootLayout = ({ children }) => {
  const router = useRouter();
  const { lang } = "router.query";

  return (
    <html lang={lang} dir={lang === 'ar' ? "rtl" : "ltr"}>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline /> 
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
