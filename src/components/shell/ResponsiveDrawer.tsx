import { Avatar, Box, Divider, Drawer, Stack, Typography } from '@mui/material';

import { BrandMark } from '@components/brand/BrandMark';
import { NavigationMenu } from '@components/navigation/NavigationMenu';
import { navigationItems } from '@config/navigation';
import { useAuth } from '@contexts/auth/useAuth';
import { getUserDisplayName } from '@features/profile/utils/profileDefaults';
import { getInitials } from '@utils/userFormatters';

type ResponsiveDrawerProps = {
  drawerWidth: number;
  mobileOpen: boolean;
  onClose: () => void;
};

export function ResponsiveDrawer({ drawerWidth, mobileOpen, onClose }: ResponsiveDrawerProps) {
  const { isAuthenticated, user } = useAuth();
  const displayName = getUserDisplayName(user);
  const visibleItems = navigationItems.filter((item) =>
    isAuthenticated ? item.section !== 'access' : item.section === 'access',
  );

  const drawerContent = (
    <Stack sx={{ height: '100%' }}>
      <Box sx={{ px: 2.5, py: 2.25 }}>
        <BrandMark />
      </Box>
      {isAuthenticated && user && (
        <Box sx={{ px: 2.5, pb: 2.25 }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              borderRadius: 2,
              border: 1,
              borderColor: 'rgba(24,25,29,0.08)',
              p: 1.5,
              bgcolor: 'rgba(255, 255, 255, 0.74)',
              boxShadow: '0 14px 34px rgba(20,20,24,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Avatar
              src={user.avatar ?? undefined}
              alt={`${displayName} profile photo`}
              sx={{
                width: 44,
                height: 44,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 900,
              }}
            >
              {getInitials(displayName)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" fontWeight={900} noWrap>
                {displayName}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap display="block">
                {user.email}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      <Divider sx={{ borderColor: 'rgba(24,25,29,0.08)' }} />
      <NavigationMenu items={visibleItems} onNavigate={onClose} />
      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );

  return (
    <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            maxWidth: '86vw',
            borderRight: 0,
            boxShadow: '0 28px 80px rgba(16,19,26,0.24)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            borderRight: 1,
            borderColor: 'rgba(24,25,29,0.08)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
