import { Alert, Snackbar } from '@mui/material';

export type AppNotice = {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
};

type AppSnackbarProps = {
  notice: AppNotice | null;
  onClose: () => void;
};

export function AppSnackbar({ notice, onClose }: AppSnackbarProps) {
  return (
    <Snackbar
      open={Boolean(notice)}
      autoHideDuration={2400}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={notice?.severity ?? 'info'} variant="filled" sx={{ width: '100%' }}>
        {notice?.message}
      </Alert>
    </Snackbar>
  );
}
