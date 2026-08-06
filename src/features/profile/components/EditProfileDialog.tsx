import { zodResolver } from '@hookform/resolvers/zod';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ConfirmDialog } from '@components/controls/ConfirmDialog';
import { profileSchema, type ProfileFormValues } from '@features/profile/schemas/profileSchema';

type EditProfileDialogProps = {
  open: boolean;
  initialValues: ProfileFormValues;
  onClose: () => void;
  onSave: (values: ProfileFormValues) => Promise<void>;
};

export function EditProfileDialog({
  open,
  initialValues,
  onClose,
  onSave,
}: EditProfileDialogProps) {
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [initialValues, open, reset]);

  const requestClose = () => {
    if (isDirty) {
      setConfirmCloseOpen(true);
      return;
    }

    onClose();
  };

  const confirmClose = () => {
    setConfirmCloseOpen(false);
    reset(initialValues);
    onClose();
  };

  const onSubmit = handleSubmit(async (values) => {
    await onSave(values);
  });

  return (
    <>
      <Dialog open={open} onClose={requestClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ pr: 6 }}>
          Edit profile information
          <IconButton
            aria-label="Close edit profile dialog"
            onClick={requestClose}
            sx={{ position: 'absolute', right: 12, top: 12 }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack
            component="form"
            id="edit-profile-form"
            spacing={2.5}
            onSubmit={(event) => void onSubmit(event)}
          >
            <Alert severity="info">
              Changes update the account context immediately and persist for the current demo user.
            </Alert>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First name"
                      autoComplete="given-name"
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last name"
                      autoComplete="family-name"
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      autoComplete="email"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone number"
                      autoComplete="tel"
                      error={Boolean(errors.phone)}
                      helperText={errors.phone?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Date of birth"
                      type="date"
                      slotProps={{ inputLabel: { shrink: true } }}
                      error={Boolean(errors.dateOfBirth)}
                      helperText={errors.dateOfBirth?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Postal code"
                      autoComplete="postal-code"
                      error={Boolean(errors.postalCode)}
                      helperText={errors.postalCode?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
                      autoComplete="street-address"
                      error={Boolean(errors.address)}
                      helperText={errors.address?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="City"
                      autoComplete="address-level2"
                      error={Boolean(errors.city)}
                      helperText={errors.city?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Country"
                      autoComplete="country-name"
                      error={Boolean(errors.country)}
                      helperText={errors.country?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={requestClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" form="edit-profile-form" variant="contained" loading={isSubmitting}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmCloseOpen}
        title="Discard unsaved changes?"
        description="You have unsaved profile changes. Closing this dialog will discard them."
        confirmLabel="Discard changes"
        confirmColor="error"
        onClose={() => setConfirmCloseOpen(false)}
        onConfirm={confirmClose}
      />
    </>
  );
}
