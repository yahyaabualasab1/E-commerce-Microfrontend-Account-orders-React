import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: { xs: 360, md: 480 },
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Stack spacing={2.5} alignItems="center">
        <Typography variant="overline" color="text.secondary">
          404
        </Typography>
        <Box>
          <Typography variant="h4" component="h1">
            Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 480 }}>
            This account area does not exist in the Account & Orders microfrontend.
          </Typography>
        </Box>
        <Button component={RouterLink} to="/dashboard" variant="contained">
          Back to dashboard
        </Button>
      </Stack>
    </Box>
  );
}
