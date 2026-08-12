import BuildCircleRoundedIcon from '@mui/icons-material/BuildCircleRounded';
import { Box, Typography } from '@mui/material';

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
      <Box
        aria-hidden="true"
        sx={{
          width: 34,
          height: 34,
          borderRadius: 1.5,
          display: 'grid',
          placeItems: 'center',
          color: 'primary.contrastText',
          background: 'linear-gradient(135deg, #10131b, #2d3445)',
          fontWeight: 800,
          flex: '0 0 auto',
          boxShadow: '0 12px 28px rgba(16, 19, 27, 0.24)',
        }}
      >
        <BuildCircleRoundedIcon fontSize="small" />
      </Box>
      {!compact && (
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontWeight: 800, lineHeight: 1.1, color: 'text.primary' }}
          >
            Auto Parts Marketplace
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1 }}>
            Account & Orders
          </Typography>
        </Box>
      )}
    </Box>
  );
}
