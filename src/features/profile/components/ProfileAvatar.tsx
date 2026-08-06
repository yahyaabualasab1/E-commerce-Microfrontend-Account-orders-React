import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';

import { getInitials } from '@utils/userFormatters';

type ProfileAvatarProps = {
  name: string;
  avatar?: string | null;
  size?: number;
  onUpload?: () => void;
};

export function ProfileAvatar({ name, avatar, size = 132, onUpload }: ProfileAvatarProps) {
  return (
    <Box sx={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
      <Avatar
        src={avatar ?? undefined}
        alt={`${name} profile image`}
        sx={{
          width: size,
          height: size,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 900,
          fontSize: Math.max(28, size * 0.24),
          border: '5px solid rgba(255,255,255,0.92)',
          boxShadow: '0 18px 44px rgba(16, 19, 26, 0.18)',
        }}
      >
        {getInitials(name)}
      </Avatar>
      {onUpload && (
        <Tooltip title="Change profile photo">
          <IconButton
            aria-label="Upload profile photo"
            onClick={onUpload}
            sx={{
              position: 'absolute',
              right: 2,
              bottom: 2,
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              border: '3px solid #fff',
              '&:hover': { bgcolor: 'secondary.dark' },
            }}
          >
            <PhotoCameraOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
