import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import type { SvgIconComponent } from '@mui/icons-material';

export type NavigationItem = {
  label: string;
  path: string;
  icon: SvgIconComponent;
  section: 'account' | 'commerce' | 'access';
};

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: DashboardOutlinedIcon,
    section: 'account',
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: SettingsOutlinedIcon,
    section: 'account',
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: LocalMallOutlinedIcon,
    section: 'commerce',
  },
  {
    label: 'Wishlist',
    path: '/wishlist',
    icon: FavoriteBorderOutlinedIcon,
    section: 'commerce',
  },
  {
    label: 'Reviews',
    path: '/reviews',
    icon: RateReviewOutlinedIcon,
    section: 'commerce',
  },
  {
    label: 'Login',
    path: '/login',
    icon: LoginOutlinedIcon,
    section: 'access',
  },
  {
    label: 'Register',
    path: '/register',
    icon: PersonAddAltOutlinedIcon,
    section: 'access',
  },
];
