import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { ConfirmDialog } from '@components/controls/ConfirmDialog';
import { StatCard } from '@components/data/StatCard';
import { AppSnackbar, type AppNotice } from '@components/feedback/AppSnackbar';
import { BreadcrumbNavigation } from '@components/navigation/BreadcrumbNavigation';
import { useAuth } from '@contexts/auth/useAuth';
import { mockOrders } from '@mocks/orders';
import { mockReviews } from '@mocks/reviews';
import { mockWishlist } from '@mocks/wishlist';
import { ChangePasswordDialog } from '@features/profile/components/ChangePasswordDialog';
import { EditProfileDialog } from '@features/profile/components/EditProfileDialog';
import { ProfileAvatar } from '@features/profile/components/ProfileAvatar';
import { ProfileImagePreviewDialog } from '@features/profile/components/ProfileImagePreviewDialog';
import { useProfileImage } from '@features/profile/hooks/useProfileImage';
import type { ProfileFormValues } from '@features/profile/schemas/profileSchema';
import { getProfileCompletion } from '@features/profile/utils/profileCompletion';
import {
  defaultNotificationPreferences,
  fashionPreferenceOptions,
  getNotificationPreferencesStorageKey,
  getProfilePreferencesStorageKey,
  normalizeUser,
} from '@features/profile/utils/profileDefaults';
import type { NotificationPreferences } from '../../../types/auth';
import { getErrorMessage } from '@utils/asyncError';
import { saveToStorage } from '@utils/storage';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function ProfileSectionCard({
  title,
  subtitle,
  icon,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider', height: '100%' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } } }}>
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="flex-start">
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 1.5,
                  display: 'grid',
                  placeItems: 'center',
                  color: 'primary.main',
                  bgcolor: 'rgba(31, 36, 48, 0.07)',
                  flex: '0 0 auto',
                }}
              >
                {icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" component="h2">
                  {title}
                </Typography>
                {subtitle && (
                  <Typography variant="body2" color="text.secondary">
                    {subtitle}
                  </Typography>
                )}
              </Box>
            </Stack>
            {action}
          </Stack>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary" fontWeight={800}>
        {label}
      </Typography>
      <Typography sx={{ mt: 0.35, overflowWrap: 'anywhere' }}>{value || 'Not provided'}</Typography>
    </Box>
  );
}

export function ProfilePage() {
  const { user, updateProfile, updateProfileImage } = useAuth();
  const normalizedUser = useMemo(() => (user ? normalizeUser(user) : null), [user]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [removePhotoOpen, setRemovePhotoOpen] = useState(false);
  const [notice, setNotice] = useState<AppNotice | null>(null);
  const [preferredCategories, setPreferredCategories] = useState<string[]>(
    normalizedUser?.preferredCategories ?? [],
  );
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(
    normalizedUser?.notificationPreferences ?? defaultNotificationPreferences,
  );
  const profileImage = useProfileImage();

  useEffect(() => {
    setPreferredCategories(normalizedUser?.preferredCategories ?? []);
    setNotificationPreferences(
      normalizedUser?.notificationPreferences ?? defaultNotificationPreferences,
    );
  }, [
    normalizedUser?.id,
    normalizedUser?.notificationPreferences,
    normalizedUser?.preferredCategories,
  ]);

  const profileUser = useMemo(
    () =>
      normalizedUser
        ? normalizeUser({
            ...normalizedUser,
            preferredCategories,
            notificationPreferences,
          })
        : null,
    [normalizedUser, notificationPreferences, preferredCategories],
  );
  const completion = getProfileCompletion(profileUser);
  const displayName = profileUser?.fullName ?? profileUser?.name ?? 'Fashion Member';

  const formValues: ProfileFormValues = {
    firstName: profileUser?.firstName ?? '',
    lastName: profileUser?.lastName ?? '',
    email: profileUser?.email ?? '',
    phone: profileUser?.phone ?? '',
    dateOfBirth: profileUser?.dateOfBirth ?? '',
    address: profileUser?.address ?? '',
    city: profileUser?.city ?? '',
    country: profileUser?.country ?? '',
    postalCode: profileUser?.postalCode ?? '',
    preferredCategories,
  };

  const handleSave = async (values: ProfileFormValues) => {
    if (!profileUser) {
      return;
    }

    try {
      const nextValues = {
        ...values,
        preferredCategories,
      };
      await updateProfile(nextValues);
      saveToStorage(getProfilePreferencesStorageKey(profileUser.id), preferredCategories);
      setDialogOpen(false);
      setNotice({ message: 'Profile updated successfully.', severity: 'success' });
    } catch (error: unknown) {
      setNotice({
        message: getErrorMessage(error, 'Profile could not be updated.'),
        severity: 'error',
      });
    }
  };

  const handlePhotoSave = () => {
    void profileImage.savePhoto((avatar) => {
      updateProfileImage(avatar);
      setNotice({ message: 'Profile photo updated.', severity: 'success' });
    });
  };

  const handleRemovePhoto = () => {
    updateProfileImage(null);
    setRemovePhotoOpen(false);
    setNotice({ message: 'Profile photo removed.', severity: 'success' });
  };

  const handlePreferencesChange = (nextPreferences: string[]) => {
    if (!profileUser) {
      return;
    }

    setPreferredCategories(nextPreferences);
    saveToStorage(getProfilePreferencesStorageKey(profileUser.id), nextPreferences);
    setNotice({ message: 'Fashion preferences saved.', severity: 'success' });
  };

  const handleNotificationChange = (key: keyof NotificationPreferences, value: boolean) => {
    if (!profileUser) {
      return;
    }

    const nextPreferences = {
      ...notificationPreferences,
      [key]: value,
    };

    setNotificationPreferences(nextPreferences);
    saveToStorage(getNotificationPreferencesStorageKey(profileUser.id), nextPreferences);
    setNotice({ message: 'Notification preferences saved.', severity: 'success' });
  };

  if (!profileUser) {
    return <Alert severity="error">Profile information is unavailable.</Alert>;
  }

  const profileStats = [
    {
      label: 'Total Orders',
      value: mockOrders.length.toString(),
      helper: 'Completed and active purchases',
      icon: <LocalMallOutlinedIcon />,
      color: 'primary.main',
    },
    {
      label: 'Wishlist Items',
      value: mockWishlist.length.toString(),
      helper: 'Saved fashion pieces',
      icon: <AutoAwesomeOutlinedIcon />,
      color: 'secondary.main',
    },
    {
      label: 'Reviews Written',
      value: mockReviews.length.toString(),
      helper: 'Verified product feedback',
      icon: <RateReviewOutlinedIcon />,
      color: 'success.main',
    },
    {
      label: 'Loyalty Points',
      value: profileUser.loyaltyPoints?.toLocaleString('en-US') ?? '0',
      helper: profileUser.membershipLevel ?? 'Member',
      icon: <LoyaltyOutlinedIcon />,
      color: 'warning.main',
    },
  ];

  const notificationLabels: Record<keyof NotificationPreferences, string> = {
    orderUpdates: 'Order updates',
    wishlistPriceDrops: 'Wishlist price-drop alerts',
    reviewReminders: 'Review reminders',
    fashionRecommendations: 'Fashion recommendations',
    promotionalEmails: 'Promotional emails',
    newCollectionAlerts: 'New collection alerts',
  };

  return (
    <>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <BreadcrumbNavigation
          items={[{ label: 'Account', href: '/dashboard' }, { label: 'Profile' }]}
        />

        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: 'divider',
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: 280,
              height: 280,
              borderRadius: '50%',
              right: -88,
              top: -112,
              bgcolor: 'rgba(255,255,255,0.09)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              width: 220,
              height: 220,
              borderRadius: '50%',
              left: '44%',
              bottom: -150,
              bgcolor: 'rgba(184,107,119,0.24)',
            },
          }}
        >
          <CardContent sx={{ position: 'relative', p: { xs: 3, md: 4.5 } }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 3, md: 4 }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              <ProfileAvatar
                name={displayName}
                avatar={profileUser.avatar}
                onUpload={profileImage.openFilePicker}
              />
              <Stack spacing={2.5} sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack spacing={1.25}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    justifyContent={{ xs: 'center', md: 'flex-start' }}
                  >
                    <Chip label={profileUser.membershipLevel} color="secondary" />
                    <Chip
                      icon={<CheckCircleRoundedIcon />}
                      label="Verified account"
                      sx={{ bgcolor: 'rgba(255,255,255,0.14)', color: 'inherit' }}
                    />
                  </Stack>
                  <Box>
                    <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                      Premium profile
                    </Typography>
                    <Typography variant="h3" component="h1">
                      {displayName}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.78)', mt: 0.75 }}>
                      {profileUser.email}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.78)' }}>
                    Member since {formatDate(profileUser.memberSince ?? profileUser.createdAt)}
                  </Typography>
                </Stack>

                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={800}>Profile completion</Typography>
                    <Typography fontWeight={900}>{completion.percentage}%</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={completion.percentage}
                    sx={{
                      mt: 1,
                      height: 10,
                      borderRadius: 999,
                      bgcolor: 'rgba(255,255,255,0.16)',
                      '& .MuiLinearProgress-bar': { bgcolor: 'secondary.light' },
                    }}
                  />
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => setDialogOpen(true)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCameraOutlinedIcon />}
                    onClick={profileImage.openFilePicker}
                    sx={{ color: 'inherit', borderColor: 'rgba(255,255,255,0.42)' }}
                  >
                    Change Photo
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={<RemoveCircleOutlineRoundedIcon />}
                    onClick={() => setRemovePhotoOpen(true)}
                    disabled={!profileUser.avatar}
                  >
                    Remove Photo
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Box
          component="input"
          ref={profileImage.inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => profileImage.handleFileChange(event.target.files?.[0] ?? null)}
          sx={{ display: 'none' }}
          aria-label="Choose profile photo"
        />

        {profileImage.error && <Alert severity="error">{profileImage.error}</Alert>}

        <Grid container spacing={2.5}>
          {profileStats.map((stat) => (
            <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <ProfileSectionCard
              title="Profile Completion"
              subtitle={`${completion.completed} of ${completion.total} fields complete`}
              icon={<TuneOutlinedIcon />}
              action={
                <Button size="small" onClick={() => setDialogOpen(true)}>
                  Complete Profile
                </Button>
              }
            >
              <Stack spacing={2}>
                <Typography variant="h3" color="primary">
                  {completion.percentage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={completion.percentage}
                  sx={{ height: 10, borderRadius: 999 }}
                />
                {completion.missing.length > 0 ? (
                  <Alert severity="warning">
                    Missing: {completion.missing.slice(0, 4).join(', ')}
                    {completion.missing.length > 4 ? '...' : ''}
                  </Alert>
                ) : (
                  <Alert severity="success">Your profile is complete.</Alert>
                )}
              </Stack>
            </ProfileSectionCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <ProfileSectionCard
              title="Personal Information"
              subtitle="Core account identity and contact details"
              icon={<EmailOutlinedIcon />}
              action={
                <Button startIcon={<EditOutlinedIcon />} onClick={() => setDialogOpen(true)}>
                  Edit
                </Button>
              }
            >
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem label="First Name" value={profileUser.firstName ?? ''} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem label="Last Name" value={profileUser.lastName ?? ''} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem label="Full Name" value={displayName} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem label="Email" value={profileUser.email} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem label="Phone Number" value={profileUser.phone} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem
                    label="Date of Birth"
                    value={profileUser.dateOfBirth ? formatDate(profileUser.dateOfBirth) : ''}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem label="Address" value={profileUser.address} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem label="City" value={profileUser.city ?? ''} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem label="Country" value={profileUser.country ?? ''} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem label="Postal Code" value={profileUser.postalCode ?? ''} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <DetailItem
                    label="Member Since"
                    value={formatDate(profileUser.memberSince ?? profileUser.createdAt)}
                  />
                </Grid>
              </Grid>
            </ProfileSectionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileSectionCard
              title="Shipping Address"
              subtitle="Default delivery destination"
              icon={<HomeOutlinedIcon />}
              action={<Chip label="Default Address" color="success" variant="outlined" />}
            >
              <Stack spacing={2}>
                <DetailItem label="Address label" value="Home" />
                <DetailItem label="Recipient name" value={displayName} />
                <DetailItem label="Phone number" value={profileUser.phone} />
                <DetailItem label="Address" value={profileUser.address} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <DetailItem label="City" value={profileUser.city ?? ''} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <DetailItem label="Country" value={profileUser.country ?? ''} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <DetailItem label="Postal Code" value={profileUser.postalCode ?? ''} />
                  </Grid>
                </Grid>
                <Button
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => setDialogOpen(true)}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Edit Address
                </Button>
              </Stack>
            </ProfileSectionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileSectionCard
              title="Fashion Preferences"
              subtitle="Personalize marketplace recommendations"
              icon={<AutoAwesomeOutlinedIcon />}
            >
              <Autocomplete
                multiple
                options={fashionPreferenceOptions}
                value={preferredCategories}
                onChange={(_, value) => handlePreferencesChange(value)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      color="secondary"
                      {...getTagProps({ index })}
                      key={option}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Preferred categories" placeholder="Choose styles" />
                )}
              />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {preferredCategories.map((preference) => (
                  <Chip key={preference} label={preference} variant="outlined" />
                ))}
              </Stack>
            </ProfileSectionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileSectionCard
              title="Notification Preferences"
              subtitle="Choose what the account experience can send"
              icon={<NotificationsOutlinedIcon />}
            >
              <Stack divider={<Divider />} spacing={0.5}>
                {(Object.keys(notificationLabels) as Array<keyof NotificationPreferences>).map(
                  (key) => (
                    <Stack
                      key={key}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      py={1}
                    >
                      <Typography fontWeight={700}>{notificationLabels[key]}</Typography>
                      <Switch
                        checked={notificationPreferences[key]}
                        onChange={(_, checked) => handleNotificationChange(key, checked)}
                        inputProps={{ 'aria-label': notificationLabels[key] }}
                      />
                    </Stack>
                  ),
                )}
              </Stack>
            </ProfileSectionCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ProfileSectionCard
              title="Security Overview"
              subtitle="Frontend-only mock security controls"
              icon={<SecurityOutlinedIcon />}
              action={
                <Chip
                  icon={<CheckCircleRoundedIcon />}
                  label="Secure account"
                  color="success"
                  variant="outlined"
                />
              }
            >
              <Stack spacing={2}>
                <DetailItem label="Account status" value="Verified and active" />
                <DetailItem label="Password status" value="Strong password configured" />
                <DetailItem label="Last password update" value="July 18, 2026" />
                <DetailItem label="Current session" value="Authenticated demo session" />
                <Button
                  variant="contained"
                  startIcon={<LockOutlinedIcon />}
                  onClick={() => setPasswordDialogOpen(true)}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Change Password
                </Button>
              </Stack>
            </ProfileSectionCard>
          </Grid>
        </Grid>
      </Stack>

      <EditProfileDialog
        open={dialogOpen}
        initialValues={formValues}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
      <ProfileImagePreviewDialog
        preview={profileImage.preview}
        saving={profileImage.saving}
        onClose={profileImage.reset}
        onSave={handlePhotoSave}
      />
      <ConfirmDialog
        open={removePhotoOpen}
        title="Remove profile photo?"
        description="Your initials will be restored as the profile avatar across the account area."
        confirmLabel="Remove Photo"
        confirmColor="error"
        onClose={() => setRemovePhotoOpen(false)}
        onConfirm={handleRemovePhoto}
      />
      <ChangePasswordDialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
        onSuccess={() => {
          setPasswordDialogOpen(false);
          setNotice({ message: 'Password changed successfully.', severity: 'success' });
        }}
      />
      <AppSnackbar notice={notice} onClose={() => setNotice(null)} />
    </>
  );
}
