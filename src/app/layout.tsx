import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { StyledRoot } from './StyledRoot';
import ApolloWrapper from '@/lib/ApolloWrapper';
import { AppWrapper } from '@/context/index';

export const metadata: Metadata = {
  title: 'Gestor de fichas',
  description: 'Gestor de fichas',
  icons:
    'https://fundacionbariloche.org.ar/wp-content/uploads/2023/09/LOGO-FB-WEB.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AppRouterCacheProvider>
            <AppWrapper>
              <StyledRoot>{children}</StyledRoot>
            </AppWrapper>
          </AppRouterCacheProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
