import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@contexts/auth/AuthContext';
import { globalStyles } from '@styles/globalStyles';
import { theme } from '@styles/theme';
import type { PropsWithChildren } from 'react';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
