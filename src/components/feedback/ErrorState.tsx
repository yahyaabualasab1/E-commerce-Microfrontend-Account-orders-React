import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { Alert, Button, Stack } from '@mui/material';

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Alert
      severity="error"
      action={
        onRetry ? (
          <Button color="inherit" size="small" startIcon={<ReplayRoundedIcon />} onClick={onRetry}>
            Retry
          </Button>
        ) : undefined
      }
    >
      <Stack component="span">{message}</Stack>
    </Alert>
  );
}
