import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ViewAgendaRoundedIcon from '@mui/icons-material/ViewAgendaRounded';
import {
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ConfirmDialog } from '@components/controls/ConfirmDialog';
import { FilterSelect, type SelectOption } from '@components/controls/FilterSelect';
import { EmptyState } from '@components/feedback/EmptyState';
import { ErrorState } from '@components/feedback/ErrorState';
import { LoadingState } from '@components/feedback/LoadingState';
import { AppSnackbar, type AppNotice } from '@components/feedback/AppSnackbar';
import { BreadcrumbNavigation } from '@components/navigation/BreadcrumbNavigation';
import { PageHeader } from '@components/page/PageHeader';
import { WishlistProductCard } from '@features/wishlist/components/WishlistProductCard';
import type { WishlistProduct } from '@features/wishlist/types/wishlist';
import { useAsyncResource } from '@hooks/useAsyncResource';
import { wishlistService } from '@services/wishlistService';
import { getErrorMessage } from '@utils/asyncError';
import { dispatchAccountEvent, dispatchWishlistMoveToCart } from '@utils/microfrontendEvents';

type CategoryFilter = 'All' | WishlistProduct['category'];
type AvailabilityFilter = 'All' | 'In stock' | 'Out of stock';
type WishlistSort = 'recent' | 'priceAsc' | 'priceDesc' | 'ratingDesc';
type WishlistView = 'grid' | 'list';

const categoryOptions: SelectOption<CategoryFilter>[] = [
  { label: 'All categories', value: 'All' },
  { label: 'Brakes', value: 'Brakes' },
  { label: 'Lighting', value: 'Lighting' },
  { label: 'Exterior', value: 'Exterior' },
  { label: 'Interior', value: 'Interior' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Maintenance', value: 'Maintenance' },
  { label: 'Engine', value: 'Engine' },
  { label: 'Tires', value: 'Tires' },
  { label: 'Accessories', value: 'Accessories' },
];

const availabilityOptions: SelectOption<AvailabilityFilter>[] = [
  { label: 'All availability', value: 'All' },
  { label: 'In stock', value: 'In stock' },
  { label: 'Out of stock', value: 'Out of stock' },
];

const sortOptions: SelectOption<WishlistSort>[] = [
  { label: 'Recently added', value: 'recent' },
  { label: 'Price low to high', value: 'priceAsc' },
  { label: 'Price high to low', value: 'priceDesc' },
  { label: 'Highest rated', value: 'ratingDesc' },
];

const initialVisibleCount = 8;

export function WishlistPage() {
  const [notice, setNotice] = useState<AppNotice | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [brand, setBrand] = useState('All');
  const [availability, setAvailability] = useState<AvailabilityFilter>('All');
  const [sort, setSort] = useState<WishlistSort>('recent');
  const [view, setView] = useState<WishlistView>('grid');
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [removeTarget, setRemoveTarget] = useState<WishlistProduct | null>(null);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const loadWishlist = useCallback(() => wishlistService.getWishlist(), []);
  const {
    data: products,
    loading,
    error,
    reload,
    setData,
  } = useAsyncResource<WishlistProduct[]>(loadWishlist, {
    errorMessage: 'Wishlist could not be loaded.',
  });


  useEffect(() => {
    const handleWishlistUpdate = () => {
      void reload();
    };

    window.addEventListener('account:wishlist-updated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('account:wishlist-updated', handleWishlistUpdate);
    };
  }, [reload]);
  const brands = useMemo(() => {
    const uniqueBrands = Array.from(
      new Set((products ?? []).map((product) => product.brand)),
    ).sort();
    return ['All', ...uniqueBrands];
  }, [products]);

  const brandOptions = useMemo<SelectOption<string>[]>(
    () => brands.map((value) => ({ label: value === 'All' ? 'All brands' : value, value })),
    [brands],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...(products ?? [])]
      .filter((product) => {
        const matchesQuery =
          !normalizedQuery ||
          [product.name, product.brand, product.category, product.description, product.sku]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesCategory = category === 'All' || product.category === category;
        const matchesBrand = brand === 'All' || product.brand === brand;
        const matchesAvailability =
          availability === 'All' ||
          (availability === 'In stock' ? product.inStock : !product.inStock);

        return matchesQuery && matchesCategory && matchesBrand && matchesAvailability;
      })
      .sort((first, second) => {
        switch (sort) {
          case 'priceAsc':
            return first.price - second.price;
          case 'priceDesc':
            return second.price - first.price;
          case 'ratingDesc':
            return second.rating - first.rating;
          case 'recent':
            return new Date(second.dateAdded).getTime() - new Date(first.dateAdded).getTime();
        }
      });
  }, [availability, brand, category, products, query, sort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const productCount = products?.length ?? 0;
  const totalValue = (products ?? []).reduce((sum, product) => sum + product.price, 0);
  const hasFilters =
    Boolean(query.trim()) || category !== 'All' || brand !== 'All' || availability !== 'All';

  const handleRemove = () => {
    if (!removeTarget) {
      return;
    }

    const product = removeTarget;
    void wishlistService
      .removeWishlistItem(product.id)
      .then((nextProducts) => {
        setData(nextProducts);
        setRemoveTarget(null);
        dispatchAccountEvent('account:wishlist-item-removed', {
          productId: product.id,
          source: 'account-orders',
        });
        setNotice({ message: `${product.name} removed from wishlist.`, severity: 'info' });
      })
      .catch((removeError: unknown) => {
        setNotice({
          message: getErrorMessage(removeError, 'Item could not be removed.'),
          severity: 'error',
        });
      });
  };

  const handleClearAll = () => {
    const productIds = (products ?? []).map((product) => product.id);
    void wishlistService
      .clearWishlist()
      .then((nextProducts) => {
        setData(nextProducts);
        setClearDialogOpen(false);
        dispatchAccountEvent('account:wishlist-cleared', {
          productIds,
          source: 'account-orders',
        });
        setNotice({ message: 'Wishlist cleared.', severity: 'info' });
      })
      .catch((clearError: unknown) => {
        setNotice({
          message: getErrorMessage(clearError, 'Wishlist could not be cleared.'),
          severity: 'error',
        });
      });
  };

  const handleRestore = () => {
    void wishlistService
      .restoreWishlist()
      .then((nextProducts) => {
        setData(nextProducts);
        setVisibleCount(initialVisibleCount);
        setNotice({ message: 'Mock wishlist restored.', severity: 'success' });
      })
      .catch((restoreError: unknown) => {
        setNotice({
          message: getErrorMessage(restoreError, 'Wishlist could not be restored.'),
          severity: 'error',
        });
      });
  };

  const handleMoveToCart = (product: WishlistProduct) => {
    dispatchWishlistMoveToCart(product);
    setNotice({ message: `${product.name} sent to Cart microfrontend.`, severity: 'success' });
  };

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setBrand('All');
    setAvailability('All');
    setSort('recent');
    setVisibleCount(initialVisibleCount);
  };

  return (
    <>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <BreadcrumbNavigation
          items={[{ label: 'Account', href: '/dashboard' }, { label: 'Wishlist' }]}
        />
        <PageHeader
          eyebrow="Wishlist"
          title="Saved parts"
          description="Curate favorite car parts, tools, lighting, and accessories before moving them into the shopping journey."
          icon={<FavoriteBorderRoundedIcon />}
          iconColor="secondary.main"
          action={
            <Stack spacing={0.5} alignItems={{ xs: 'flex-start', sm: 'flex-end' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={800}>
                {productCount} saved {productCount === 1 ? 'item' : 'items'}
              </Typography>
              <Typography variant="h6" color="primary">
                ${totalValue.toFixed(2)}
              </Typography>
            </Stack>
          }
        />

        <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
          <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', lg: 'row' }}
                spacing={1.5}
                alignItems={{ lg: 'center' }}
              >
                <TextField
                  size="small"
                  label="Search wishlist"
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
                  label="Category"
                  value={category}
                  options={categoryOptions}
                  onChange={setCategory}
                />
                <FilterSelect
                  label="Brand"
                  value={brand}
                  options={brandOptions}
                  onChange={setBrand}
                />
                <FilterSelect
                  label="Availability"
                  value={availability}
                  options={availabilityOptions}
                  onChange={setAvailability}
                />
                <FilterSelect
                  label="Sort by"
                  value={sort}
                  options={sortOptions}
                  onChange={setSort}
                />
              </Stack>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                justifyContent="space-between"
              >
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={view}
                  onChange={(_, nextView: WishlistView | null) => {
                    if (nextView) {
                      setView(nextView);
                    }
                  }}
                  aria-label="Wishlist view"
                >
                  <ToggleButton value="grid" aria-label="Grid view">
                    <GridViewRoundedIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="list" aria-label="List view">
                    <ViewAgendaRoundedIcon fontSize="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <Button
                    startIcon={<RestartAltRoundedIcon />}
                    onClick={resetFilters}
                    disabled={!hasFilters}
                  >
                    Reset filters
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => setClearDialogOpen(true)}
                    disabled={productCount === 0}
                  >
                    Clear all
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {loading ? (
          <Grid container spacing={2.5}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
                <Skeleton variant="rounded" height={460} />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : productCount === 0 ? (
          <EmptyState
            icon={<FavoriteBorderRoundedIcon fontSize="large" />}
            title="Your wishlist is empty"
            description="Saved car parts and accessories will appear here so you can revisit them later."
            actionLabel="Restore mock wishlist"
            onAction={handleRestore}
            iconColor="secondary.main"
          />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={<SearchRoundedIcon fontSize="large" />}
            title="No wishlist matches"
            description="Adjust your search or filters to find a saved product."
            actionLabel="Reset filters"
            onAction={resetFilters}
          />
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" fontWeight={800}>
              Showing {visibleProducts.length} of {filteredProducts.length} matching parts
            </Typography>
            <Grid container spacing={2.5}>
              {visibleProducts.map((product) => (
                <Grid
                  key={product.id}
                  size={view === 'grid' ? { xs: 12, sm: 6, lg: 4, xl: 3 } : { xs: 12 }}
                >
                  <WishlistProductCard
                    product={product}
                    view={view}
                    onRemove={setRemoveTarget}
                    onMoveToCart={handleMoveToCart}
                  />
                </Grid>
              ))}
            </Grid>
            {visibleCount < filteredProducts.length && (
              <Button
                variant="outlined"
                onClick={() => setVisibleCount((current) => current + 4)}
                sx={{ alignSelf: 'center', minWidth: 180 }}
              >
                Load more
              </Button>
            )}
          </>
        )}

        {loading && <LoadingState />}
      </Stack>

      <ConfirmDialog
        open={Boolean(removeTarget)}
        title="Remove wishlist item?"
        description={`Remove ${removeTarget?.name ?? 'this item'} from your wishlist. This action will also notify the host shell.`}
        confirmLabel="Remove item"
        confirmColor="error"
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleRemove}
      />
      <ConfirmDialog
        open={clearDialogOpen}
        title="Clear wishlist?"
        description="Remove every saved item from your wishlist. You can restore mock data for the demo afterward."
        confirmLabel="Clear wishlist"
        confirmColor="error"
        onClose={() => setClearDialogOpen(false)}
        onConfirm={handleClearAll}
      />
      <AppSnackbar notice={notice} onClose={() => setNotice(null)} />
    </>
  );
}
