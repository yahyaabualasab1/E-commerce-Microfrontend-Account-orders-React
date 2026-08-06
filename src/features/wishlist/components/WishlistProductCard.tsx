import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { PriceDisplay } from '@components/data/PriceDisplay';
import { StatusChip } from '@components/data/StatusChip';
import { ProductImage } from '@components/media/ProductImage';
import type { WishlistProduct } from '@features/wishlist/types/wishlist';
import { formatDateAdded } from '@features/wishlist/utils/wishlistFormatters';

type WishlistProductCardProps = {
  product: WishlistProduct;
  view: 'grid' | 'list';
  onRemove: (product: WishlistProduct) => void;
  onMoveToCart: (product: WishlistProduct) => void;
};

export function WishlistProductCard({
  product,
  view,
  onRemove,
  onMoveToCart,
}: WishlistProductCardProps) {
  const isList = view === 'list';

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        '&:hover img': {
          transform: 'scale(1.035)',
        },
      }}
    >
      <Stack direction={isList ? { xs: 'column', md: 'row' } : 'column'} sx={{ height: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            width: isList ? { xs: '100%', md: 260 } : '100%',
            flex: '0 0 auto',
          }}
        >
          <ProductImage
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            aspectRatio={isList ? '4 / 3' : '4 / 5'}
          />
          <Tooltip title="Saved to wishlist">
            <IconButton
              aria-label={`${product.name} is saved to wishlist`}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                bgcolor: 'rgba(255, 255, 255, 0.94)',
                color: 'secondary.main',
                '&:hover': { bgcolor: 'background.paper' },
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
          </Tooltip>
          {product.discountPercentage && (
            <Chip
              label={`${product.discountPercentage}% off`}
              color="secondary"
              size="small"
              sx={{ position: 'absolute', left: 12, top: 12 }}
            />
          )}
        </Box>

        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, flexGrow: 1 }}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" color="text.secondary" fontWeight={800}>
                    {product.brand}
                  </Typography>
                  <Typography variant="h6" component="h2" sx={{ mt: 0.25 }}>
                    {product.name}
                  </Typography>
                </Box>
                <StatusChip inStock={product.inStock} quantity={product.stockQuantity} />
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
                {product.description}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip size="small" label={product.category} />
              <Chip size="small" label={`SKU ${product.sku}`} variant="outlined" />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Rating value={product.rating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" color="text.secondary" fontWeight={700}>
                {product.rating.toFixed(1)} ({product.reviewCount})
              </Typography>
            </Stack>

            <PriceDisplay price={product.price} originalPrice={product.originalPrice} />

            <Stack spacing={0.75}>
              <Typography variant="caption" color="text.secondary" fontWeight={800}>
                Colors
              </Typography>
              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                {product.colors.slice(0, 4).map((color) => (
                  <Chip key={color} size="small" label={color} variant="outlined" />
                ))}
              </Stack>
            </Stack>

            <Stack spacing={0.75}>
              <Typography variant="caption" color="text.secondary" fontWeight={800}>
                Sizes
              </Typography>
              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                {product.sizes.slice(0, 6).map((size) => (
                  <Chip key={size} size="small" label={size} variant="outlined" />
                ))}
              </Stack>
            </Stack>

            <Typography variant="caption" color="text.secondary">
              Added {formatDateAdded(product.dateAdded)}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: isList ? 'row' : 'column' }}
              spacing={1.25}
              sx={{ mt: 'auto' }}
            >
              <Button
                variant="contained"
                startIcon={<ShoppingBagOutlinedIcon />}
                onClick={() => onMoveToCart(product)}
                disabled={!product.inStock}
                fullWidth
              >
                Move to Cart
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineRoundedIcon />}
                onClick={() => onRemove(product)}
                fullWidth
              >
                Remove
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
}
