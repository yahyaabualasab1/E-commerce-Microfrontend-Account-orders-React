import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

import { AuthFeatureItem } from '@components/auth/AuthFeatureItem';
import { BrandMark } from '@components/brand/BrandMark';

type AuthBrandPanelProps = {
  image: string;
  headline: string;
  description: string;
  features: string[];
  scene?: 'login' | 'register';
  compact?: boolean;
  children?: ReactNode;
};

export function AuthBrandPanel({
  image,
  headline,
  description,
  features,
  compact = false,
  children,
}: AuthBrandPanelProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: compact ? 260 : '100%',
        overflow: 'hidden',
        borderRadius: { xs: 0, md: 3 },
        bgcolor: '#f4eee9',
        color: 'primary.contrastText',
        '&:hover img': {
          transform: 'scale(1.035)',
        },
      }}
    >
      <Box
        component="img"
        src={image}
        alt=""
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.96,
          transition: 'transform 900ms ease, opacity 220ms ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(10,12,18,0.76) 0%, rgba(10,12,18,0.5) 52%, rgba(10,12,18,0.22) 100%), linear-gradient(180deg, rgba(10,12,18,0.16), rgba(10,12,18,0.42))',
        }}
      />
      <Stack
        spacing={3}
        justifyContent="space-between"
        sx={{
          position: 'relative',
          minHeight: compact ? 260 : '100%',
          p: { xs: 3, sm: 4, lg: 5 },
          textShadow: '0 2px 16px rgba(0,0,0,0.36)',
          animation: 'authCopyIn 340ms ease both',
          '@keyframes authCopyIn': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      >
        <BrandMark />
        <Stack spacing={2.5} sx={{ maxWidth: 560 }}>
          <Typography variant={compact ? 'h4' : 'h2'} component="h1">
            {headline}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.88)', fontSize: { md: 18 } }}>
            {description}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {features.map((feature) => (
              <AuthFeatureItem key={feature} label={feature} />
            ))}
          </Stack>
        </Stack>
        {children}
      </Stack>
    </Box>
  );
}
