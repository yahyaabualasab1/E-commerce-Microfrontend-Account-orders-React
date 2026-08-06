import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  LinearProgress,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { ConfirmDialog } from '@components/controls/ConfirmDialog';
import { FilterSelect, type SelectOption } from '@components/controls/FilterSelect';
import { StatCard } from '@components/data/StatCard';
import { EmptyState } from '@components/feedback/EmptyState';
import { ErrorState } from '@components/feedback/ErrorState';
import { AppSnackbar, type AppNotice } from '@components/feedback/AppSnackbar';
import { BreadcrumbNavigation } from '@components/navigation/BreadcrumbNavigation';
import { PageHeader } from '@components/page/PageHeader';
import { EditReviewDialog } from '@features/reviews/components/EditReviewDialog';
import { ReviewCard } from '@features/reviews/components/ReviewCard';
import type { ProductReview } from '@features/reviews/types/review';
import { useAsyncResource } from '@hooks/useAsyncResource';
import { reviewService } from '@services/reviewService';
import { getErrorMessage } from '@utils/asyncError';

type RatingFilter = 'All' | '5' | '4' | '3' | '2' | '1';
type ReviewSort = 'newest' | 'oldest' | 'highest' | 'lowest';

const ratingOptions: SelectOption<RatingFilter>[] = [
  { label: 'All ratings', value: 'All' },
  { label: '5 stars', value: '5' },
  { label: '4 stars', value: '4' },
  { label: '3 stars', value: '3' },
  { label: '2 stars', value: '2' },
  { label: '1 star', value: '1' },
];

const sortOptions: SelectOption<ReviewSort>[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Highest rating', value: 'highest' },
  { label: 'Lowest rating', value: 'lowest' },
];

function getMostReviewedCategory(reviews: ProductReview[]) {
  const counts = reviews.reduce<Record<string, number>>((result, review) => {
    result[review.productCategory] = (result[review.productCategory] ?? 0) + 1;
    return result;
  }, {});

  return Object.entries(counts).sort((first, second) => second[1] - first[1])[0]?.[0] ?? 'None';
}

export function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<ProductReview | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductReview | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<AppNotice | null>(null);
  const [query, setQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('All');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<ReviewSort>('newest');
  const loadReviews = useCallback(() => reviewService.getReviews(), []);
  const {
    data: reviews,
    loading,
    error,
    reload,
    setData,
  } = useAsyncResource<ProductReview[]>(loadReviews, {
    errorMessage: 'Reviews could not be loaded.',
  });

  const reviewList = useMemo(() => reviews ?? [], [reviews]);
  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(reviewList.map((review) => review.productCategory))).sort(),
    ],
    [reviewList],
  );
  const categoryOptions = useMemo<SelectOption<string>[]>(
    () => categories.map((value) => ({ label: value === 'All' ? 'All categories' : value, value })),
    [categories],
  );

  const filteredReviews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...reviewList]
      .filter((review) => {
        const matchesQuery =
          !normalizedQuery ||
          [
            review.productName,
            review.productBrand,
            review.productCategory,
            review.title,
            review.comment,
            review.orderId,
          ]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesRating =
          ratingFilter === 'All' || Math.floor(review.rating).toString() === ratingFilter;
        const matchesCategory = category === 'All' || review.productCategory === category;

        return matchesQuery && matchesRating && matchesCategory;
      })
      .sort((first, second) => {
        switch (sort) {
          case 'oldest':
            return new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime();
          case 'highest':
            return second.rating - first.rating;
          case 'lowest':
            return first.rating - second.rating;
          case 'newest':
            return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
        }
      });
  }, [category, query, ratingFilter, reviewList, sort]);

  const averageRating = reviewList.length
    ? reviewList.reduce((sum, review) => sum + review.rating, 0) / reviewList.length
    : 0;
  const fiveStarCount = reviewList.filter((review) => Math.floor(review.rating) === 5).length;
  const distribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviewList.filter((review) => Math.floor(review.rating) === rating).length;
    const percentage = reviewList.length ? Math.round((count / reviewList.length) * 100) : 0;
    return { rating, count, percentage };
  });

  const handleSave = (updatedReview: ProductReview) => {
    setSaving(true);
    void reviewService
      .updateReview(updatedReview)
      .then((savedReview) => {
        setData(reviewList.map((review) => (review.id === savedReview.id ? savedReview : review)));
        setSelectedReview(null);
        setNotice({ message: 'Review updated successfully.', severity: 'success' });
      })
      .catch((saveError: unknown) => {
        setNotice({
          message: getErrorMessage(saveError, 'Review could not be updated.'),
          severity: 'error',
        });
      })
      .finally(() => setSaving(false));
  };

  const handleDelete = () => {
    if (!deleteTarget) {
      return;
    }

    void reviewService
      .deleteReview(deleteTarget.id)
      .then((nextReviews) => {
        setData(nextReviews);
        setDeleteTarget(null);
        setNotice({ message: 'Review deleted.', severity: 'info' });
      })
      .catch((deleteError: unknown) => {
        setNotice({
          message: getErrorMessage(deleteError, 'Review could not be deleted.'),
          severity: 'error',
        });
      });
  };

  const handleRestore = () => {
    void reviewService
      .restoreReviews()
      .then((nextReviews) => {
        setData(nextReviews);
        setNotice({ message: 'Mock reviews restored.', severity: 'success' });
      })
      .catch((restoreError: unknown) => {
        setNotice({
          message: getErrorMessage(restoreError, 'Reviews could not be restored.'),
          severity: 'error',
        });
      });
  };

  const resetFilters = () => {
    setQuery('');
    setRatingFilter('All');
    setCategory('All');
    setSort('newest');
  };

  return (
    <>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <BreadcrumbNavigation
          items={[{ label: 'Account', href: '/dashboard' }, { label: 'Reviews' }]}
        />
        <PageHeader
          eyebrow="Reviews"
          title="Product reviews"
          description="Manage verified product feedback, edit review details, and keep your marketplace voice current."
          icon={<RateReviewOutlinedIcon />}
          action={
            <Stack spacing={0.5} alignItems={{ xs: 'flex-start', sm: 'flex-end' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={800}>
                {reviewList.length} {reviewList.length === 1 ? 'review' : 'reviews'}
              </Typography>
              <Typography variant="h6" color="primary">
                {averageRating.toFixed(1)} average rating
              </Typography>
            </Stack>
          }
        />

        {loading ? (
          <Grid container spacing={2.5}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Skeleton variant="rounded" height={150} />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : (
          <>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <StatCard
                  label="Total Reviews"
                  value={reviewList.length.toString()}
                  helper="Reviews written"
                  icon={<RateReviewOutlinedIcon />}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <StatCard
                  label="Average Rating"
                  value={averageRating.toFixed(1)}
                  helper="Across all reviews"
                  icon={<GradeRoundedIcon />}
                  color="secondary.main"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <StatCard
                  label="Five-Star Reviews"
                  value={fiveStarCount.toString()}
                  helper="Top-rated purchases"
                  icon={<StarRoundedIcon />}
                  color="success.main"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <StatCard
                  label="Top Category"
                  value={getMostReviewedCategory(reviewList)}
                  helper="Most reviewed category"
                  icon={<CategoryOutlinedIcon />}
                  color="warning.main"
                />
              </Grid>
            </Grid>

            <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="h6" component="h2">
                      Rating distribution
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Breakdown of your published product ratings.
                    </Typography>
                  </Box>
                  <Stack spacing={1.5}>
                    {distribution.map((item) => (
                      <Stack key={item.rating} direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="body2" sx={{ width: 56 }} fontWeight={800}>
                          {item.rating} stars
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={item.percentage}
                          sx={{ flexGrow: 1, height: 9, borderRadius: 999 }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ width: 72, textAlign: 'right' }}
                        >
                          {item.count} ({item.percentage}%)
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
              <CardContent
                sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}
              >
                <Stack
                  direction={{ xs: 'column', lg: 'row' }}
                  spacing={1.5}
                  alignItems={{ lg: 'center' }}
                >
                  <TextField
                    size="small"
                    label="Search reviews"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchRoundedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ minWidth: { lg: 280 }, flexGrow: 1 }}
                  />
                  <FilterSelect
                    label="Rating"
                    value={ratingFilter}
                    options={ratingOptions}
                    onChange={setRatingFilter}
                  />
                  <FilterSelect
                    label="Category"
                    value={category}
                    options={categoryOptions}
                    onChange={setCategory}
                  />
                  <FilterSelect
                    label="Sort by"
                    value={sort}
                    options={sortOptions}
                    onChange={setSort}
                  />
                </Stack>
              </CardContent>
            </Card>

            {reviewList.length === 0 ? (
              <EmptyState
                icon={<RateReviewOutlinedIcon fontSize="large" />}
                title="No reviews yet"
                description="Product reviews you have written will appear here."
                actionLabel="Restore mock reviews"
                onAction={handleRestore}
              />
            ) : filteredReviews.length === 0 ? (
              <EmptyState
                icon={<SearchRoundedIcon fontSize="large" />}
                title="No review matches"
                description="Adjust your search, rating, or category filters to find a review."
                actionLabel="Reset filters"
                onAction={resetFilters}
              />
            ) : (
              <Grid container spacing={2.5}>
                {filteredReviews.map((review) => (
                  <Grid key={review.id} size={{ xs: 12, xl: 6 }}>
                    <ReviewCard
                      review={review}
                      onEdit={setSelectedReview}
                      onDelete={setDeleteTarget}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Stack>

      <EditReviewDialog
        review={selectedReview}
        saving={saving}
        onClose={() => setSelectedReview(null)}
        onSave={handleSave}
      />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete review?"
        description={`Delete your review for ${deleteTarget?.productName ?? 'this product'}. This cannot be undone.`}
        confirmLabel="Delete review"
        confirmColor="error"
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
      <AppSnackbar notice={notice} onClose={() => setNotice(null)} />
    </>
  );
}
