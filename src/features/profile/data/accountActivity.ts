import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import type { SvgIconComponent } from '@mui/icons-material';

export type AccountActivity = {
  id: string;
  title: string;
  description: string;
  occurredAt: string;
  icon: SvgIconComponent;
};

export const recentAccountActivity: AccountActivity[] = [
  {
    id: 'profile-photo-changed',
    title: 'Profile photo changed',
    description: 'Your account avatar was updated for the profile experience.',
    occurredAt: '2026-08-05T18:30:00.000Z',
    icon: PhotoCameraOutlinedIcon,
  },
  {
    id: 'profile-info-updated',
    title: 'Personal information updated',
    description: 'Contact and shipping profile details were refreshed.',
    occurredAt: '2026-08-04T16:15:00.000Z',
    icon: TuneOutlinedIcon,
  },
  {
    id: 'wishlist-item-removed',
    title: 'Wishlist item removed',
    description: 'A saved fashion piece was removed from the wishlist.',
    occurredAt: '2026-08-03T11:05:00.000Z',
    icon: FavoriteBorderRoundedIcon,
  },
  {
    id: 'review-edited',
    title: 'Review edited',
    description: 'A product review was updated after a verified purchase.',
    occurredAt: '2026-08-01T09:45:00.000Z',
    icon: RateReviewOutlinedIcon,
  },
  {
    id: 'order-viewed',
    title: 'Order details viewed',
    description: 'Recent order details were opened from the account area.',
    occurredAt: '2026-07-30T14:22:00.000Z',
    icon: LocalMallOutlinedIcon,
  },
  {
    id: 'password-reviewed',
    title: 'Security reviewed',
    description: 'Password and current session status were checked.',
    occurredAt: '2026-07-28T08:10:00.000Z',
    icon: LockOutlinedIcon,
  },
];
