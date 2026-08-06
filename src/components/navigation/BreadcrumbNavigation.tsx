import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbNavigationProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbNavigation({ items }: BreadcrumbNavigationProps) {
  return (
    <Breadcrumbs aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return isLast || !item.href ? (
          <Typography key={item.label} variant="body2" color="text.primary" fontWeight={700}>
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.href}
            variant="body2"
            color="text.secondary"
            underline="hover"
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
