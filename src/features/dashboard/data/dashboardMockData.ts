import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import type { SvgIconComponent } from '@mui/icons-material';

export type DashboardStat = {
  label: string;
  value: string;
  helper: string;
  icon: SvgIconComponent;
  color: 'primary' | 'secondary' | 'success' | 'warning';
};

export const dashboardStats: DashboardStat[] = [
  {
    label: 'Orders',
    value: '12',
    helper: '3 delivered this month',
    icon: LocalMallOutlinedIcon,
    color: 'primary',
  },
  {
    label: 'Wishlist',
    value: '24',
    helper: '8 items back in stock',
    icon: FavoriteBorderOutlinedIcon,
    color: 'secondary',
  },
  {
    label: 'Reviews',
    value: '7',
    helper: '2 pending product reviews',
    icon: RateReviewOutlinedIcon,
    color: 'success',
  },
  {
    label: 'Profile',
    value: '82%',
    helper: 'Add vehicle preferences to complete',
    icon: TaskAltOutlinedIcon,
    color: 'warning',
  },
];

export const recentOrder = {
  id: 'ORD-1048',
  status: 'In transit',
  itemCount: 3,
  total: '$186.40',
  placedAt: 'Aug 4, 2026',
  summary: 'Dash cam, engine oil, wiper blades',
};
