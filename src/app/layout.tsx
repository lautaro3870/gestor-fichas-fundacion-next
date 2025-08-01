import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { StyledRoot } from './StyledRoot';
import ApolloWrapper from '@/lib/ApolloWrapper';

export const metadata: Metadata = {
  title: 'Gestor de fichas',
  description: 'Gestor de fichas',
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
            <StyledRoot>{children}</StyledRoot>
          </AppRouterCacheProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
