import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { Grid, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { EmptyState } from '@components/feedback/EmptyState';
import { ErrorState } from '@components/feedback/ErrorState';
import { LoadingState } from '@components/feedback/LoadingState';
import { PageHeader } from '@components/page/PageHeader';
import { OrderCard } from '@features/orders/components/OrderCard';
import { OrderDetailsDialog } from '@features/orders/components/OrderDetailsDialog';
import type { Order } from '@features/orders/types/order';
import { useAsyncResource } from '@hooks/useAsyncResource';
import { orderService } from '@services/orderService';

export function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const loadOrders = useCallback(() => orderService.getOrders(), []);
  const {
    data: orders,
    loading,
    error,
    reload,
    setData,
  } = useAsyncResource<Order[]>(loadOrders, {
    errorMessage: 'Orders could not be loaded.',
  });

    useEffect(() => {
    const handleOrdersUpdate = () => {
      void reload();
    };

    window.addEventListener('account:orders-updated', handleOrdersUpdate);

    return () => {
      window.removeEventListener('account:orders-updated', handleOrdersUpdate);
    };
  }, [reload]);

  const handleRestore = () => {
    void orderService.resetOrders().then(setData);
  };

  const orderCount = orders?.length ?? 0;

  return (
    <>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <PageHeader
          eyebrow="Order history"
          title="Your orders"
          description="Review recent car parts purchases, shipping details, payment methods, and purchased products."
          icon={<Inventory2OutlinedIcon />}
        />

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : orderCount > 0 ? (
          <Grid container spacing={2.5}>
            {(orders ?? []).map((order) => (
              <Grid key={order.id} size={{ xs: 12, xl: 6 }}>
                <OrderCard order={order} onViewDetails={setSelectedOrder} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState
            icon={<Inventory2OutlinedIcon fontSize="large" />}
            title="No orders yet"
            description="Completed car parts purchases will appear here once orders are available."
            actionLabel="Restore mock orders"
            onAction={handleRestore}
          />
        )}
      </Stack>

      <OrderDetailsDialog order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
}
