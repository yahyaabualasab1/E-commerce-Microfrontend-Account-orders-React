import { Chip } from '@mui/material';

type StatusChipProps = {
  inStock: boolean;
  quantity?: number;
};

export function StatusChip({ inStock, quantity }: StatusChipProps) {
  if (!inStock) {
    return <Chip size="small" label="Out of stock" color="error" variant="outlined" />;
  }

  if (typeof quantity === 'number' && quantity <= 10) {
    return <Chip size="small" label={`Only ${quantity} left`} color="warning" variant="outlined" />;
  }

  return <Chip size="small" label="In stock" color="success" variant="outlined" />;
}
