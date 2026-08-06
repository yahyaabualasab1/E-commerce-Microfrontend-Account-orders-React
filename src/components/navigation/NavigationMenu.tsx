import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import type { NavigationItem } from '@config/navigation';

type NavigationMenuProps = {
  items: NavigationItem[];
  onNavigate?: () => void;
};

export function NavigationMenu({ items, onNavigate }: NavigationMenuProps) {
  const location = useLocation();

  return (
    <List sx={{ px: 1.5, py: 1.25 }}>
      {items.map((item) => {
        const Icon = item.icon;
        const selected =
          location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

        return (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              selected={selected}
              onClick={onNavigate}
              sx={{
                minHeight: 48,
                borderRadius: 2,
                color: selected ? 'primary.main' : 'text.secondary',
                position: 'relative',
                transition:
                  'background-color 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  width: 4,
                  height: selected ? 24 : 0,
                  borderRadius: 999,
                  bgcolor: 'secondary.main',
                  transform: 'translateY(-50%)',
                  transition: 'height 180ms ease',
                },
                '&.Mui-selected': {
                  bgcolor: 'rgba(31, 36, 48, 0.08)',
                  color: 'primary.main',
                  boxShadow: 'inset 0 0 0 1px rgba(31,36,48,0.05)',
                },
                '&.Mui-selected:hover, &:hover': {
                  bgcolor: selected ? 'rgba(31,36,48,0.1)' : 'rgba(184,107,119,0.08)',
                  transform: 'translateX(2px)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 42, color: 'inherit', pl: 0.5 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: selected ? 700 : 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
