import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { AuthBrandPanel } from '@components/auth/AuthBrandPanel';
import { AppSnackbar, type AppNotice } from '@components/feedback/AppSnackbar';
import { fashionImages } from '@config/images';
import { useAuth } from '@contexts/auth/useAuth';
import { loginSchema, type LoginFormValues } from '@features/auth/schemas/authSchemas';
import { getErrorMessage } from '@utils/asyncError';
import { delay } from '@utils/timing';

function getRedirectPath(state: unknown): string {
  if (state && typeof state === 'object' && 'from' in state) {
    const from = (state as Record<string, unknown>).from;
    return typeof from === 'string' ? from : '/dashboard';
  }

  return '/dashboard';
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState<AppNotice | null>(null);
  const redirectTo = getRedirectPath(location.state);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);

    try {
      await login(values);
      setNotice({ message: 'Login successful. Redirecting to dashboard.', severity: 'success' });
      await delay(550);
      void navigate(redirectTo, { replace: true });
    } catch (error: unknown) {
      setFormError(getErrorMessage(error, 'Unable to sign in with these details.'));
    }
  });

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(420px, 0.95fr) minmax(420px, 1fr)' },
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <AuthBrandPanel
            compact
            scene="login"
            image={fashionImages.authLogin}
            headline="Style that feels like you."
            description="Curated fashion, secure account access, and effortless order tracking."
            features={[
              'Curated fashion collections',
              'Secure account experience',
              'Easy order tracking',
            ]}
          />
        </Box>

        <Box sx={{ display: { xs: 'none', lg: 'block' }, p: 2 }}>
          <AuthBrandPanel
            scene="login"
            image={fashionImages.authLogin}
            headline="Style that feels like you."
            description="Enter a marketplace account designed around refined style, saved favorites, and complete order clarity."
            features={[
              'Curated fashion collections',
              'Secure account experience',
              'Easy order tracking',
            ]}
          />
        </Box>

        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 4, md: 7 },
            minWidth: 0,
          }}
        >
          <Card
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 520,
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
                spacing={2.5}
                onSubmit={(event) => void onSubmit(event)}
                noValidate
              >
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Welcome back
                  </Typography>
                  <Typography variant="h4" component="h1" sx={{ mt: 0.5 }}>
                    Sign in to your account
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Manage your profile, orders, wishlist, and reviews from one premium account
                    space.
                  </Typography>
                </Box>

                {formError && <Alert severity="error">{formError}</Alert>}

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
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

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                >
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value}
                            onChange={(_, checked) => field.onChange(checked)}
                          />
                        }
                        label="Remember me"
                      />
                    )}
                  />
                  <Link component="button" type="button" underline="hover" fontWeight={800}>
                    Forgot password?
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isSubmitting}
                  fullWidth
                >
                  Sign in
                </Button>

                <Alert
                  severity="info"
                  icon={<LockOutlinedIcon />}
                  sx={{ alignItems: 'center', bgcolor: 'rgba(31, 36, 48, 0.04)' }}
                >
                  Secure sign-in with a locally stored demo session.
                </Alert>

                <Card
                  elevation={0}
                  sx={{ border: 1, borderColor: 'divider', bgcolor: 'background.default' }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="body2" fontWeight={800}>
                      Demo account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      alex.morgan@example.com / Password123
                    </Typography>
                  </CardContent>
                </Card>

                <Divider />

                <Typography variant="body2" color="text.secondary" textAlign="center">
                  New here?{' '}
                  <Link component={RouterLink} to="/register" color="primary" fontWeight={800}>
                    Create an account
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
