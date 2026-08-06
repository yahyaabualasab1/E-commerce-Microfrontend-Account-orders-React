import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Stack, Typography } from '@mui/material';

type AuthFeatureItemProps = {
  label: string;
};

export function AuthFeatureItem({ label }: AuthFeatureItemProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <CheckCircleRoundedIcon fontSize="small" sx={{ color: 'secondary.light' }} />
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.84)' }}>
        {label}
      </Typography>
    </Stack>
  );
}
