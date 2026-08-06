import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { ProductImage } from '@components/media/ProductImage';
import type { ProductReview } from '@features/reviews/types/review';

type EditReviewDialogProps = {
  review: ProductReview | null;
  saving: boolean;
  onClose: () => void;
  onSave: (review: ProductReview) => void;
};

export function EditReviewDialog({ review, saving, onClose, onSave }: EditReviewDialogProps) {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ title?: string; comment?: string }>({});

  useEffect(() => {
    if (review) {
      setTitle(review.title);
      setRating(review.rating);
      setComment(review.comment);
      setErrors({});
    }
  }, [review]);

  const handleSave = () => {
    const nextTitle = title.trim();
    const nextComment = comment.trim();
    const nextErrors = {
      title: nextTitle.length < 4 ? 'Review title must be at least 4 characters.' : undefined,
      comment: nextComment.length < 20 ? 'Comment must be at least 20 characters.' : undefined,
    };

    setErrors(nextErrors);

    if (!review || nextErrors.title || nextErrors.comment || rating <= 0) {
      return;
    }

    onSave({
      ...review,
      title: nextTitle,
      rating,
      comment: nextComment,
    });
  };

  return (
    <Dialog open={Boolean(review)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pr: 6 }}>
        Edit review
        <IconButton
          aria-label="Close edit review dialog"
          onClick={onClose}
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      {review && (
        <DialogContent dividers>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ width: 86, flex: '0 0 auto' }}>
                <ProductImage
                  src={review.productImage}
                  alt={review.productName}
                  aspectRatio="1 / 1"
                  rounded
                />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={800}>
                  {review.productBrand}
                </Typography>
                <Typography variant="h6" component="p">
                  {review.productName}
                </Typography>
              </Box>
            </Stack>

            <TextField
              label="Review title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              error={Boolean(errors.title)}
              helperText={errors.title}
              fullWidth
            />

            <Box>
              <Typography
                component="legend"
                variant="body2"
                color="text.secondary"
                fontWeight={800}
              >
                Rating
              </Typography>
              <Rating
                value={rating}
                precision={0.5}
                onChange={(_, nextValue) => setRating(nextValue ?? 0)}
                sx={{ mt: 1 }}
              />
            </Box>

            <TextField
              label="Comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              error={Boolean(errors.comment)}
              helperText={errors.comment}
              fullWidth
              multiline
              minRows={4}
            />

            {review.reviewImages.length > 0 && (
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary" fontWeight={800}>
                  Review photos
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {review.reviewImages.map((image) => (
                    <Box key={image} sx={{ width: 78 }}>
                      <ProductImage
                        src={image}
                        alt={`${review.productName} review preview`}
                        aspectRatio="1 / 1"
                        rounded
                      />
                    </Box>
                  ))}
                </Stack>
              </Stack>
            )}
          </Stack>
        </DialogContent>
      )}
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={rating <= 0} loading={saving}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
