import { Box, LinearProgress } from '@mui/material';

export function LoadingState() {
  return (
    <Box sx={{ py: 1 }}>
      <LinearProgress
        aria-label="Loading content"
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: 'rgba(31,36,48,0.08)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 999,
            background: 'linear-gradient(90deg, #20232d, #b96978)',
          },
        }}
      />
    </Box>
  );
}
