import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type StatCardProps = {
  label: string;
  value: string;
  helper: string;
  icon: ReactNode;
  color?: string;
};

export function StatCard({ label, value, helper, icon, color = 'primary.main' }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: 1,
        borderColor: 'rgba(24,25,29,0.08)',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 22px 54px rgba(20,20,24,0.12)',
          borderColor: 'rgba(184,107,119,0.26)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary" fontWeight={700}>
              {label}
            </Typography>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                color,
                bgcolor: 'rgba(26, 26, 28, 0.055)',
                boxShadow: 'inset 0 0 0 1px rgba(24,25,29,0.04)',
              }}
            >
              {icon}
            </Box>
          </Stack>
          <Box>
            <Typography variant="h4" component="p">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {helper}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
