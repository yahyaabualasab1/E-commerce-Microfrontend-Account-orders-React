import { useEffect } from 'react';

import { AppProviders } from '@app/providers/AppProviders';
import { AppRouter } from '@routes/AppRouter';
import { startShellMessageBridge } from '@utils/shellMessageBridge';
import { startShellOrderBridge } from '@features/orders/utils/shellOrderBridge';

export function App() {
  useEffect(() => {
    const stopWishlistBridge = startShellMessageBridge();
    const stopOrderBridge = startShellOrderBridge();

    return () => {
      stopWishlistBridge();
      stopOrderBridge();
    };
  }, []);

  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}