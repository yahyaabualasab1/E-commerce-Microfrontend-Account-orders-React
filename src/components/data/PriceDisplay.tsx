import { Stack, Typography } from '@mui/material';

type PriceDisplayProps = {
  price: number;
  originalPrice?: number;
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function PriceDisplay({ price, originalPrice }: PriceDisplayProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="baseline">
      <Typography variant="h6" component="p" color="primary">
        {formatter.format(price)}
      </Typography>
      {originalPrice && originalPrice > price && (
        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
          {formatter.format(originalPrice)}
        </Typography>
      )}
    </Stack>
  );
}
