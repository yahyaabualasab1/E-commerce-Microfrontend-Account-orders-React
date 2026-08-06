import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  iconColor?: 'primary.main' | 'secondary.main';
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  iconColor = 'primary.main',
}: EmptyStateProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'rgba(24,25,29,0.08)',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 18%, rgba(184,107,119,0.11), transparent 28%)',
          pointerEvents: 'none',
        },
      }}
    >
      <CardContent
        sx={{
          position: 'relative',
          minHeight: { xs: 320, sm: 420 },
          display: 'grid',
          placeItems: 'center',
          p: { xs: 3, sm: 5 },
          textAlign: 'center',
        }}
      >
        <Stack spacing={2.5} alignItems="center" sx={{ maxWidth: 460 }}>
          <Box
            sx={{
              width: 76,
              height: 76,
              borderRadius: 4,
              display: 'grid',
              placeItems: 'center',
              color: iconColor,
              bgcolor:
                iconColor === 'secondary.main'
                  ? 'rgba(184, 107, 119, 0.13)'
                  : 'rgba(31, 36, 48, 0.09)',
              boxShadow: '0 18px 42px rgba(20,20,24,0.09)',
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {description}
            </Typography>
          </Box>
          <Button variant="contained" onClick={onAction}>
            {actionLabel}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
