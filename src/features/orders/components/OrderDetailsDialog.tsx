import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import type { Order } from '@features/orders/types/order';
import {
  formatCurrency,
  formatOrderDate,
  getOrderStatusColor,
} from '@features/orders/utils/orderFormatters';

type OrderDetailsDialogProps = {
  order: Order | null;
  onClose: () => void;
};

export function OrderDetailsDialog({ order, onClose }: OrderDetailsDialogProps) {
  return (
    <Dialog open={Boolean(order)} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pr: 6 }}>
        Order details
        <IconButton
          aria-label="Close order details dialog"
          onClick={onClose}
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      {order && (
        <DialogContent dividers>
          <Stack spacing={3}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
              <Box>
                <Typography variant="overline" color="text.secondary">
                  {formatOrderDate(order.orderDate)}
                </Typography>
                <Typography variant="h5" component="p">
                  {order.orderNumber}
                </Typography>
              </Box>
              <Chip label={order.status} color={getOrderStatusColor(order.status)} />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={700}>
                  Shipping address
                </Typography>
                <Typography sx={{ mt: 0.75 }}>{order.shippingAddress}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={700}>
                  Payment method
                </Typography>
                <Typography sx={{ mt: 0.75 }}>{order.paymentMethod}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={700}>
                  Total price
                </Typography>
                <Typography variant="h6" sx={{ mt: 0.5 }}>
                  {formatCurrency(order.totalPrice)}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Box>
              <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                Purchased products
              </Typography>
              <List disablePadding>
                {order.products.map((product) => (
                  <ListItem
                    key={product.id}
                    disableGutters
                    sx={{
                      py: 1.5,
                      alignItems: 'flex-start',
                      borderBottom: 1,
                      borderColor: 'divider',
                      '&:last-child': {
                        borderBottom: 0,
                      },
                    }}
                    secondaryAction={
                      <Typography fontWeight={800}>
                        {formatCurrency(product.price * product.quantity)}
                      </Typography>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        sx={{
                          bgcolor: 'rgba(199, 104, 82, 0.14)',
                          color: 'secondary.main',
                          fontWeight: 800,
                        }}
                      >
                        {product.quantity}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary={`${product.brand} | Size ${product.size} | ${product.color}`}
                      primaryTypographyProps={{ fontWeight: 700, pr: 8 }}
                      secondaryTypographyProps={{ pr: 8 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </DialogContent>
      )}
    </Dialog>
  );
}
