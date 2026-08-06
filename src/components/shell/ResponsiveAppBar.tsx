import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { BrandMark } from '@components/brand/BrandMark';
import { useAuth } from '@contexts/auth/useAuth';
import { getUserDisplayName } from '@features/profile/utils/profileDefaults';
import { designTokens } from '@styles/theme';
import { getInitials } from '@utils/userFormatters';

type ResponsiveAppBarProps = {
  drawerWidth: number;
  onOpenDrawer: () => void;
};

export function ResponsiveAppBar({ drawerWidth, onOpenDrawer }: ResponsiveAppBarProps) {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const displayName = getUserDisplayName(user);

  const handleLogout = () => {
    logout();
    void navigate('/login', { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'rgba(24,25,29,0.08)',
        bgcolor: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(22px) saturate(150%)',
        width: { lg: `calc(100% - ${drawerWidth}px)` },
        ml: { lg: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ minHeight: designTokens.layout.headerHeight, px: { xs: 2, sm: 3 } }}>
        {!isDesktop && (
          <Tooltip title="Open navigation">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open navigation"
              onClick={onOpenDrawer}
              sx={{ mr: 1 }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ display: { xs: 'flex', lg: 'none' }, minWidth: 0 }}>
          <BrandMark compact={isDesktop} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={1} alignItems="center">
          {user && (
            <Button
              variant="text"
              color="inherit"
              startIcon={
                <Avatar
                  src={user.avatar ?? undefined}
                  alt={`${displayName} profile photo`}
                  sx={{ width: 28, height: 28, fontSize: 12, fontWeight: 900 }}
                >
                  {getInitials(displayName)}
                </Avatar>
              }
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                color: 'text.secondary',
                borderRadius: 999,
                px: 1.5,
                bgcolor: 'rgba(31,36,48,0.04)',
                '&:hover': { bgcolor: 'rgba(184,107,119,0.1)' },
              }}
            >
              {displayName}
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              boxShadow: '0 14px 32px rgba(31,36,48,0.18)',
            }}
          >
            Logout
          </Button>
          <Tooltip title="Logout">
            <IconButton
              color="primary"
              aria-label="Logout"
              onClick={handleLogout}
              sx={{
                display: { xs: 'inline-flex', sm: 'none' },
                bgcolor: 'rgba(38, 60, 53, 0.1)',
              }}
            >
              <LogoutRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
