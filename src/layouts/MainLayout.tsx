import { Box, Container, Toolbar } from '@mui/material';
import { useState, type PropsWithChildren } from 'react';

import { Footer } from '@components/shell/Footer';
import { ResponsiveAppBar } from '@components/shell/ResponsiveAppBar';
import { ResponsiveDrawer } from '@components/shell/ResponsiveDrawer';
import { designTokens } from '@styles/theme';

const drawerWidth = designTokens.layout.sidebarWidth;

export function MainLayout({ children }: PropsWithChildren) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
        backgroundImage:
          'radial-gradient(circle at top right, rgba(184,107,119,0.08), transparent 30%), radial-gradient(circle at 10% 85%, rgba(31,36,48,0.06), transparent 28%)',
      }}
    >
      <ResponsiveAppBar drawerWidth={drawerWidth} onOpenDrawer={() => setMobileOpen(true)} />
      <ResponsiveDrawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <Toolbar sx={{ minHeight: designTokens.layout.headerHeight }} />
        <Container
          maxWidth="xl"
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            px: designTokens.spacing.pageX,
            py: designTokens.spacing.pageY,
            animation: 'pagePolishIn 260ms ease both',
            '@keyframes pagePolishIn': {
              from: { opacity: 0, transform: 'translateY(8px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </Box>
  );
}
