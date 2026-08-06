import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { Box, Button, Card, CardContent, Chip, Rating, Stack, Typography } from '@mui/material';

import { ProductImage } from '@components/media/ProductImage';
import type { ProductReview } from '@features/reviews/types/review';
import { formatReviewDate } from '@features/reviews/utils/reviewFormatters';

type ReviewCardProps = {
  review: ProductReview;
  onEdit: (review: ProductReview) => void;
  onDelete: (review: ProductReview) => void;
};

export function ReviewCard({ review, onEdit, onDelete }: ReviewCardProps) {
  return (
    <Card
      elevation={0}
      sx={{ height: '100%', border: 1, borderColor: 'divider', overflow: 'hidden' }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ height: '100%' }}>
        <Box sx={{ width: { xs: '100%', md: 210 }, flex: '0 0 auto' }}>
          <ProductImage
            src={review.productImage}
            alt={`${review.productBrand} ${review.productName}`}
            aspectRatio="4 / 5"
          />
        </Box>

        <CardContent
          sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } }, flexGrow: 1 }}
        >
          <Stack spacing={2} sx={{ height: '100%' }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip size="small" label={review.productCategory} />
              {review.verifiedPurchase && (
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  icon={<VerifiedRoundedIcon />}
                  label="Verified Purchase"
                />
              )}
            </Stack>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" color="text.secondary" fontWeight={800}>
                {review.productBrand}
              </Typography>
              <Typography variant="h6" component="h2" sx={{ mt: 0.25 }}>
                {review.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order {review.orderId}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Rating value={review.rating} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary" fontWeight={800}>
                {review.rating.toFixed(1)}
              </Typography>
            </Stack>

            <Box>
              <Typography variant="h6" component="h3">
                {review.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.75, overflowWrap: 'anywhere' }}>
                {review.comment}
              </Typography>
            </Box>

            {review.reviewImages.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {review.reviewImages.slice(0, 3).map((image) => (
                  <Box key={image} sx={{ width: 72 }}>
                    <ProductImage
                      src={image}
                      alt={`${review.productName} review photo`}
                      aspectRatio="1 / 1"
                      rounded
                    />
                  </Box>
                ))}
              </Stack>
            )}

            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
              <Chip
                size="small"
                icon={<ThumbUpOutlinedIcon />}
                label={`${review.helpfulCount} helpful`}
                variant="outlined"
              />
              <Chip size="small" label={formatReviewDate(review.createdAt)} variant="outlined" />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button
                variant="contained"
                startIcon={<EditOutlinedIcon />}
                onClick={() => onEdit(review)}
                fullWidth
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineRoundedIcon />}
                onClick={() => onDelete(review)}
                fullWidth
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
}
