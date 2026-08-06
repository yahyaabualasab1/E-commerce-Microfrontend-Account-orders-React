import { Box, Container, Paper } from '@mui/material';
import type { PropsWithChildren } from 'react';

import { BrandMark } from '@components/brand/BrandMark';

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        alignItems: 'center',
        bgcolor: 'background.default',
        px: { xs: 2, sm: 3 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="sm" disableGutters>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <BrandMark />
        </Box>
        <Paper
          elevation={0}
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            p: { xs: 3, sm: 4 },
            boxShadow: '0 24px 70px rgba(38, 60, 53, 0.12)',
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
}
