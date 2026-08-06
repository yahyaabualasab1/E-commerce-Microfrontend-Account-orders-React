import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import type { SvgIconComponent } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { EmptyState } from '@components/feedback/EmptyState';
import { ProductImage } from '@components/media/ProductImage';
import { fashionImages } from '@config/images';
import { useAuth } from '@contexts/auth/useAuth';
import { mockOrders } from '@mocks/orders';
import { mockReviews } from '@mocks/reviews';
import { mockWishlist } from '@mocks/wishlist';
import { getProfileCompletion } from '@features/profile/utils/profileCompletion';
import { getUserDisplayName } from '@features/profile/utils/profileDefaults';
import { getInitials } from '@utils/userFormatters';

type StatCardConfig = {
  label: string;
  value: string;
  helper: string;
  trend: string;
  icon: SvgIconComponent;
  color: 'primary' | 'secondary' | 'success' | 'warning';
};

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  occurredAt: string;
  icon: SvgIconComponent;
};

const statusColors = {
  Delivered: 'success',
  'In transit': 'primary',
  Processing: 'warning',
  Returned: 'default',
} as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function getOrderImage(productId: string) {
  if (productId.includes('blazer') || productId.includes('linen')) return fashionImages.jacket;
  if (productId.includes('tank') || productId.includes('shirt')) return fashionImages.silkShirt;
  if (productId.includes('belt') || productId.includes('scarf')) return fashionImages.sunglasses;
  if (productId.includes('dress')) return fashionImages.dress;
  if (productId.includes('boots')) return fashionImages.loafers;
  if (productId.includes('denim')) return fashionImages.trench;

  return fashionImages.fallbackProduct;
}

function SectionCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card elevation={0} sx={{ height: '100%', border: 1, borderColor: 'divider' }}>
      <CardContent sx={{ p: { xs: 2.25, sm: 3 }, '&:last-child': { pb: { xs: 2.25, sm: 3 } } }}>
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.25}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Box>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            </Box>
            {action}
          </Stack>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}

function DashboardStatCard({ stat }: { stat: StatCardConfig }) {
  const theme = useTheme();
  const Icon = stat.icon;
  const paletteColor = theme.palette[stat.color].main;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: 1,
        borderColor: 'divider',
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 22px 54px rgba(20, 20, 24, 0.12)',
          borderColor: `${paletteColor}55`,
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2.25}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                color: paletteColor,
                bgcolor: `${paletteColor}18`,
              }}
            >
              <Icon />
            </Box>
            <Chip
              icon={<TrendingUpRoundedIcon />}
              label={stat.trend}
              size="small"
              sx={{ bgcolor: `${paletteColor}12`, color: paletteColor }}
            />
          </Stack>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={800}>
              {stat.label}
            </Typography>
            <Typography variant="h3" component="p" sx={{ mt: 0.75 }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              {stat.helper}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = getUserDisplayName(user);
  const firstName = user?.firstName ?? userName.split(' ')[0] ?? 'there';
  const profileCompletion = getProfileCompletion(user).percentage;
  const totalSpent = mockOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const stats: StatCardConfig[] = [
    {
      label: 'Total Orders',
      value: mockOrders.length.toString(),
      helper: 'Lifetime marketplace purchases',
      trend: '+3 this quarter',
      icon: LocalMallOutlinedIcon,
      color: 'primary',
    },
    {
      label: 'Wishlist Items',
      value: mockWishlist.length.toString(),
      helper: 'Saved styles waiting for you',
      trend: '8 in stock',
      icon: FavoriteBorderRoundedIcon,
      color: 'secondary',
    },
    {
      label: 'Reviews Written',
      value: mockReviews.length.toString(),
      helper: 'Verified product feedback',
      trend: '+2 helpful',
      icon: RateReviewOutlinedIcon,
      color: 'success',
    },
    {
      label: 'Total Amount Spent',
      value: formatCurrency(totalSpent),
      helper: 'Across completed account orders',
      trend: 'Member value',
      icon: SavingsOutlinedIcon,
      color: 'warning',
    },
  ];

  const quickActions = [
    { label: 'View Orders', to: '/orders', icon: LocalMallOutlinedIcon },
    { label: 'Wishlist', to: '/wishlist', icon: FavoriteBorderRoundedIcon },
    { label: 'Edit Profile', to: '/profile', icon: ModeEditOutlineOutlinedIcon },
    { label: 'Reviews', to: '/reviews', icon: RateReviewOutlinedIcon },
  ];

  const activities: ActivityItem[] = [
    {
      id: 'order-delivered',
      title: 'Order delivered',
      description: `${mockOrders[1]?.orderNumber ?? 'Recent order'} arrived and is ready to style.`,
      occurredAt: 'Today, 10:24 AM',
      icon: LocalMallOutlinedIcon,
    },
    {
      id: 'review-added',
      title: 'Review added',
      description: `${mockReviews[0]?.productName ?? 'A product'} received your verified feedback.`,
      occurredAt: 'Yesterday, 6:18 PM',
      icon: RateReviewOutlinedIcon,
    },
    {
      id: 'wishlist-updated',
      title: 'Wishlist updated',
      description: `${mockWishlist[1]?.name ?? 'A saved style'} is still saved for later.`,
      occurredAt: 'Aug 4, 2:05 PM',
      icon: FavoriteBorderRoundedIcon,
    },
    {
      id: 'profile-updated',
      title: 'Profile updated',
      description: 'Account preferences and profile readiness were refreshed.',
      occurredAt: 'Aug 3, 9:30 AM',
      icon: TaskAltOutlinedIcon,
    },
  ];

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Card
        elevation={0}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 82% 18%, rgba(184,107,119,0.35), transparent 26%), radial-gradient(circle at 12% 92%, rgba(255,255,255,0.14), transparent 22%)',
          },
        }}
      >
        <CardContent sx={{ position: 'relative', p: { xs: 3, md: 4.5 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 3, md: 4 }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2.5}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
              <Avatar
                src={user?.avatar ?? undefined}
                alt={`${userName} profile photo`}
                sx={{
                  width: { xs: 76, sm: 92 },
                  height: { xs: 76, sm: 92 },
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  border: '4px solid rgba(255,255,255,0.24)',
                  boxShadow: '0 24px 56px rgba(0,0,0,0.22)',
                  fontSize: 30,
                  fontWeight: 900,
                }}
              >
                {getInitials(userName)}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1.25 }}>
                  <Chip
                    label={user?.membershipLevel ?? 'Rose Gold Member'}
                    color="secondary"
                    sx={{ color: 'secondary.contrastText' }}
                  />
                  <Chip
                    label={today}
                    sx={{ bgcolor: 'rgba(255,255,255,0.13)', color: 'inherit' }}
                  />
                </Stack>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                  Member dashboard
                </Typography>
                <Typography variant="h3" component="h1" sx={{ mt: 0.5 }}>
                  Welcome back, {firstName}
                </Typography>
                <Typography sx={{ mt: 1.25, color: 'rgba(255,255,255,0.78)', maxWidth: 680 }}>
                  Your wardrobe moves fast. Keep your orders, saved pieces, and style feedback in
                  one polished account space.
                </Typography>
              </Box>
            </Stack>

            <Box
              sx={{
                width: { xs: '100%', md: 280 },
                borderRadius: 2,
                p: 2,
                bgcolor: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Stack spacing={1.25}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight={900}>Profile completion</Typography>
                  <Typography fontWeight={900}>{profileCompletion}%</Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={profileCompletion}
                  sx={{
                    height: 10,
                    borderRadius: 999,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': { bgcolor: 'secondary.light' },
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.76)' }}>
                  Refine your profile to unlock sharper recommendations.
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2.5}>
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <DashboardStatCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <CardContent sx={{ p: { xs: 2.25, sm: 3 } }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <AutoAwesomeRoundedIcon color="secondary" />
              <Box>
                <Typography variant="h5" component="h2">
                  Quick actions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Jump into the account tools you use most.
                </Typography>
              </Box>
            </Stack>
            <Grid container spacing={1.5}>
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Grid key={action.label} size={{ xs: 12, sm: 6, md: 3 }}>
                    <Button
                      component={RouterLink}
                      to={action.to}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      startIcon={<Icon />}
                      endIcon={<ArrowForwardRoundedIcon />}
                      sx={{
                        justifyContent: 'space-between',
                        minHeight: 54,
                        px: 2,
                        bgcolor: 'background.paper',
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <SectionCard
            title="Recent orders"
            subtitle="Latest purchases and their fulfillment status."
            action={
              <Button component={RouterLink} to="/orders" endIcon={<ArrowForwardRoundedIcon />}>
                View all
              </Button>
            }
          >
            {mockOrders.length === 0 ? (
              <EmptyState
                icon={<LocalMallOutlinedIcon fontSize="large" />}
                title="No orders yet"
                description="Once you place an order, your latest fashion purchases will appear here."
                actionLabel="Browse wishlist"
                onAction={() => void navigate('/wishlist')}
              />
            ) : (
              <Stack spacing={1.5}>
                {mockOrders.slice(0, 3).map((order) => {
                  const firstProduct = order.products[0];

                  return (
                    <Card
                      key={order.id}
                      elevation={0}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        transition: 'transform 180ms ease, box-shadow 180ms ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 16px 38px rgba(20,20,24,0.1)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={2}
                          alignItems={{ xs: 'stretch', sm: 'center' }}
                        >
                          <Box sx={{ width: { xs: '100%', sm: 92 }, flex: '0 0 auto' }}>
                            <ProductImage
                              src={getOrderImage(firstProduct?.id ?? '')}
                              alt={firstProduct?.name ?? order.orderNumber}
                              aspectRatio="1 / 1"
                              rounded
                            />
                          </Box>
                          <Stack spacing={0.75} sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              flexWrap="wrap"
                              useFlexGap
                            >
                              <Typography variant="h6" component="h3">
                                {order.orderNumber}
                              </Typography>
                              <Chip
                                label={order.status}
                                color={statusColors[order.status]}
                                size="small"
                                variant="outlined"
                              />
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                              {firstProduct?.name ?? 'Fashion order'} and{' '}
                              {Math.max(order.products.length - 1, 0)} more pieces
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                              <Chip label={formatDate(order.orderDate)} size="small" />
                              <Chip label={formatCurrency(order.totalPrice)} size="small" />
                            </Stack>
                          </Stack>
                          <Button
                            component={RouterLink}
                            to="/orders"
                            endIcon={<ArrowForwardRoundedIcon />}
                          >
                            View Details
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            )}
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <SectionCard
            title="Recent activity"
            subtitle="A quick timeline of important account moments."
          >
            <Stack spacing={0}>
              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <Stack
                    key={activity.id}
                    direction="row"
                    spacing={1.75}
                    sx={{ position: 'relative', pb: index === activities.length - 1 ? 0 : 2.25 }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: 'rgba(184,107,119,0.12)',
                        color: 'secondary.main',
                        flex: '0 0 auto',
                        zIndex: 1,
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    {index !== activities.length - 1 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 20,
                          top: 42,
                          bottom: 0,
                          width: 1,
                          bgcolor: 'divider',
                        }}
                      />
                    )}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={900}>{activity.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                        {activity.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={800}>
                        {activity.occurredAt}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <SectionCard
            title="Wishlist preview"
            subtitle="A few saved styles from your current wardrobe board."
            action={
              <Button component={RouterLink} to="/wishlist" endIcon={<ArrowForwardRoundedIcon />}>
                Open wishlist
              </Button>
            }
          >
            {mockWishlist.length === 0 ? (
              <EmptyState
                icon={<FavoriteBorderRoundedIcon fontSize="large" />}
                title="No saved styles"
                description="Save fashion pieces you love and they will appear on your dashboard."
                actionLabel="View wishlist"
                onAction={() => void navigate('/wishlist')}
                iconColor="secondary.main"
              />
            ) : (
              <Grid container spacing={1.5}>
                {mockWishlist.slice(0, 4).map((item) => (
                  <Grid key={item.id} size={{ xs: 6, sm: 3 }}>
                    <Stack spacing={1}>
                      <ProductImage src={item.image} alt={item.name} aspectRatio="4 / 5" rounded />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={900} noWrap>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" noWrap>
                          {item.brand}
                        </Typography>
                        <Typography variant="body2" fontWeight={900}>
                          {formatCurrency(item.price)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            )}
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <SectionCard
            title="Reviews preview"
            subtitle="Recent product feedback from verified purchases."
            action={
              <Button component={RouterLink} to="/reviews" endIcon={<ArrowForwardRoundedIcon />}>
                Manage reviews
              </Button>
            }
          >
            {mockReviews.length === 0 ? (
              <EmptyState
                icon={<RateReviewOutlinedIcon fontSize="large" />}
                title="No reviews yet"
                description="Your verified product reviews will be summarized here."
                actionLabel="Open reviews"
                onAction={() => void navigate('/reviews')}
              />
            ) : (
              <Stack divider={<Divider flexItem />} spacing={1.75}>
                {mockReviews.slice(0, 3).map((review) => (
                  <Stack key={review.id} direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ width: 66, flex: '0 0 auto' }}>
                      <ProductImage
                        src={review.productImage}
                        alt={review.productName}
                        aspectRatio="1 / 1"
                        rounded
                      />
                    </Box>
                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight={900} noWrap>
                        {review.productName}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                      <Typography variant="caption" color="text.secondary" display="block" noWrap>
                        {review.title}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  );
}
