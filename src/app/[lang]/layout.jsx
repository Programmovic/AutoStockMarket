'use client'
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { baselightTheme } from '../../utils/theme/DefaultColors';

const RootLayout = ({ children, params }) => {
  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? "rtl" : "ltr"}>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline /> 
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }]
}
export default RootLayout;
