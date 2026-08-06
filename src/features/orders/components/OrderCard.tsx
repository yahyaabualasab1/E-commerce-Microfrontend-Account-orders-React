import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

import type { Order } from '@features/orders/types/order';
import {
  formatCurrency,
  formatOrderDate,
  getOrderStatusColor,
} from '@features/orders/utils/orderFormatters';

type OrderCardProps = {
  order: Order;
  onViewDetails: (order: Order) => void;
};

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const productSummary = order.products.map((product) => product.name).join(', ');

  return (
    <Card elevation={0} sx={{ height: '100%', border: 1, borderColor: 'divider' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } } }}>
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 1.5,
                  display: 'grid',
                  placeItems: 'center',
                  color: 'primary.main',
                  bgcolor: 'rgba(38, 60, 53, 0.1)',
                  flex: '0 0 auto',
                }}
              >
                <ReceiptLongOutlinedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography variant="h6" component="h2">
                  {order.orderNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ordered {formatOrderDate(order.orderDate)}
                </Typography>
              </Box>
            </Stack>
            <Chip
              label={order.status}
              color={getOrderStatusColor(order.status)}
              variant={order.status === 'Returned' ? 'outlined' : 'filled'}
            />
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary" fontWeight={700}>
              Purchased products
            </Typography>
            <Typography sx={{ overflowWrap: 'anywhere' }}>{productSummary}</Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip icon={<LocalShippingOutlinedIcon />} label={order.shippingAddress} />
            <Chip label={order.paymentMethod} />
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total
              </Typography>
              <Typography variant="h5" component="p">
                {formatCurrency(order.totalPrice)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => onViewDetails(order)}
            >
              View details
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
