import { Box, Divider, Stack, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box component="footer" sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
      <Divider />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ pt: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          Account & Orders Microfrontend
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CBSE Car Parts Marketplace
        </Typography>
      </Stack>
    </Box>
  );
}
