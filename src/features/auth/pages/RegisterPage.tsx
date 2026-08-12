import { zodResolver } from '@hookform/resolvers/zod';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { AuthBrandPanel } from '@components/auth/AuthBrandPanel';
import { PasswordStrengthIndicator } from '@components/auth/PasswordStrengthIndicator';
import { AppSnackbar, type AppNotice } from '@components/feedback/AppSnackbar';
import { productImages } from '@config/images';
import { useAuth } from '@contexts/auth/useAuth';
import { registerSchema, type RegisterFormValues } from '@features/auth/schemas/authSchemas';
import { getErrorMessage } from '@utils/asyncError';
import { delay } from '@utils/timing';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notice, setNotice] = useState<AppNotice | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });
  const password = useWatch({ control, name: 'password' });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);

    try {
      await register(values);
      setNotice({ message: 'Account created. Redirecting to dashboard.', severity: 'success' });
      await delay(550);
      void navigate('/dashboard', { replace: true });
    } catch (error: unknown) {
      setFormError(getErrorMessage(error, 'Unable to create an account with these details.'));
    }
  });

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(420px, 0.92fr) minmax(460px, 1fr)' },
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <AuthBrandPanel
            compact
            image={productImages.authRegister}
            headline="Build your garage account."
            description="Create an account for trusted parts, saved products, and refined order management."
            features={[
              'Personalized account tools',
              'Saved parts wishlist',
              'Verified review history',
            ]}
          />
        </Box>

        <Box sx={{ display: { xs: 'none', lg: 'block' }, p: 2 }}>
          <AuthBrandPanel
            image={productImages.authRegister}
            headline="Build your garage account."
            description="Join a polished marketplace account experience for parts discovery, saved products, and every order detail."
            features={[
              'Personalized account tools',
              'Saved parts wishlist',
              'Verified review history',
            ]}
          />
        </Box>

        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, md: 7 } }}
        >
          <Card
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 560,
              border: 1,
              borderColor: 'divider',
              animation: 'authPanelIn 260ms ease both',
              '@keyframes authPanelIn': {
                from: { opacity: 0, transform: 'translateY(10px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Stack
                component="form"
                spacing={2.25}
                onSubmit={(event) => void onSubmit(event)}
                noValidate
              >
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Start your account
                  </Typography>
                  <Typography variant="h4" component="h1" sx={{ mt: 0.5 }}>
                    Create your profile
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Save parts, track purchases, and manage reviews with a secure marketplace
                    account.
                  </Typography>
                </Box>

                {formError && <Alert severity="error">{formError}</Alert>}

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full name"
                      autoComplete="name"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                      fullWidth
                    />
                  )}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone"
                        autoComplete="tel"
                        error={Boolean(errors.phone)}
                        helperText={errors.phone?.message}
                        fullWidth
                      />
                    )}
                  />
                </Stack>

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                edge="end"
                                onClick={() => setShowPassword((current) => !current)}
                              >
                                {showPassword ? (
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

                <PasswordStrengthIndicator password={password} />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Confirm password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      error={Boolean(errors.confirmPassword)}
                      helperText={errors.confirmPassword?.message}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showConfirmPassword
                                    ? 'Hide confirm password'
                                    : 'Show confirm password'
                                }
                                edge="end"
                                onClick={() => setShowConfirmPassword((current) => !current)}
                              >
                                {showConfirmPassword ? (
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

                <Controller
                  name="acceptTerms"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(_, checked) => field.onChange(checked)}
                        />
                      }
                      label="I agree to the account terms and marketplace privacy practices."
                    />
                  )}
                />
                {errors.acceptTerms?.message && (
                  <Alert severity="warning">{errors.acceptTerms.message}</Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isSubmitting}
                  fullWidth
                >
                  Create account
                </Button>

                <Divider />

                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" color="primary" fontWeight={800}>
                    Sign in
                  </Link>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <AppSnackbar notice={notice} onClose={() => setNotice(null)} />
    </>
  );
}
