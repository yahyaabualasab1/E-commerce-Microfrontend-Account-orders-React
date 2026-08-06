import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';

import { getPasswordRequirements, getPasswordStrength } from '@utils/passwordStrength';

type PasswordStrengthIndicatorProps = {
  password: string;
};

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = getPasswordStrength(password);
  const requirements = getPasswordRequirements();

  return (
    <Stack spacing={1.25}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary" fontWeight={700}>
          Password strength
        </Typography>
        <Typography variant="body2" fontWeight={800} sx={{ color: strength.color }}>
          {strength.label}
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={password ? strength.value : 0}
        sx={{
          height: 8,
          borderRadius: 999,
          '& .MuiLinearProgress-bar': {
            bgcolor: strength.color,
          },
        }}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {requirements.map((requirement) => {
          const met = requirement.test(password);

          return (
            <Stack key={requirement.label} direction="row" spacing={0.5} alignItems="center">
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  color: met ? 'success.contrastText' : 'text.secondary',
                  bgcolor: met ? 'success.main' : 'rgba(26, 26, 28, 0.08)',
                }}
              >
                {met && <CheckRoundedIcon sx={{ fontSize: 14 }} />}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {requirement.label}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
