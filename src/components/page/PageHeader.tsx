import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconColor?: 'primary.main' | 'secondary.main';
  action?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  iconColor = 'primary.main',
  action,
}: PageHeaderProps) {
  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 }, '&:last-child': { pb: { xs: 3, sm: 4 } } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0 }}>
            <Box
              sx={{
                width: { xs: 54, sm: 62 },
                height: { xs: 54, sm: 62 },
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                color: 'primary.contrastText',
                bgcolor: iconColor,
                flex: '0 0 auto',
              }}
            >
              {icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="overline" color="text.secondary">
                {eyebrow}
              </Typography>
              <Typography variant="h4" component="h1" sx={{ mt: 0.5 }}>
                {title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
                {description}
              </Typography>
            </Box>
          </Stack>
          {action}
        </Stack>
      </CardContent>
    </Card>
  );
}
