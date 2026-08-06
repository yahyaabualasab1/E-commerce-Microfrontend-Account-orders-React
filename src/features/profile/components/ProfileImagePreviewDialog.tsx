import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import type { ProfileImagePreview } from '@features/profile/hooks/useProfileImage';

type ProfileImagePreviewDialogProps = {
  preview: ProfileImagePreview | null;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
};

function formatFileSize(value: number) {
  return `${(value / 1024 / 1024).toFixed(2)} MB`;
}

export function ProfileImagePreviewDialog({
  preview,
  saving,
  onClose,
  onSave,
}: ProfileImagePreviewDialogProps) {
  return (
    <Dialog open={Boolean(preview)} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ pr: 6 }}>
        Preview profile photo
        <IconButton
          aria-label="Close profile photo preview"
          onClick={onClose}
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      {preview && (
        <DialogContent dividers>
          <Stack spacing={2.5} alignItems="center" textAlign="center">
            <Avatar
              src={preview.dataUrl}
              alt="Selected profile preview"
              sx={{
                width: { xs: 150, sm: 180 },
                height: { xs: 150, sm: 180 },
                boxShadow: '0 18px 48px rgba(16, 19, 26, 0.16)',
              }}
            />
            <Stack spacing={0.5}>
              <Typography fontWeight={800}>{preview.fileName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatFileSize(preview.fileSize)}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
      )}
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button color="inherit" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSave} loading={saving}>
          Save Photo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
