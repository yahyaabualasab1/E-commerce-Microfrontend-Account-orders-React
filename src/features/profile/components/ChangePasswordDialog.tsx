import { zodResolver } from '@hookform/resolvers/zod';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { PasswordStrengthIndicator } from '@components/auth/PasswordStrengthIndicator';
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '@features/profile/schemas/profileSchema';

type ChangePasswordDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function ChangePasswordDialog({ open, onClose, onSuccess }: ChangePasswordDialogProps) {
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const newPassword = useWatch({ control, name: 'newPassword' });

  const toggleVisibility = (field: keyof ChangePasswordFormValues) => {
    setVisibleFields((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const closeDialog = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    reset();
    onSuccess();
  });

  const renderPasswordField = (
    name: keyof ChangePasswordFormValues,
    label: string,
    autoComplete: string,
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={visibleFields[name] ? 'text' : 'password'}
          autoComplete={autoComplete}
          error={Boolean(errors[name])}
          helperText={errors[name]?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={visibleFields[name] ? `Hide ${label}` : `Show ${label}`}
                    edge="end"
                    onClick={() => toggleVisibility(name)}
                  >
                    {visibleFields[name] ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          fullWidth
        />
      )}
    />
  );

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pr: 6 }}>
        Change password
        <IconButton
          aria-label="Close change password dialog"
          onClick={closeDialog}
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack
          component="form"
          id="change-password-form"
          spacing={2.5}
          onSubmit={(event) => void onSubmit(event)}
        >
          {renderPasswordField('currentPassword', 'Current password', 'current-password')}
          {renderPasswordField('newPassword', 'New password', 'new-password')}
          <PasswordStrengthIndicator password={newPassword} />
          {renderPasswordField('confirmPassword', 'Confirm new password', 'new-password')}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button color="inherit" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="change-password-form"
          variant="contained"
          loading={isSubmitting}
        >
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}
