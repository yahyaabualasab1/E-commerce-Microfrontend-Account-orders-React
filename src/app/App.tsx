import { useEffect } from 'react';

import { AppProviders } from '@app/providers/AppProviders';
import { AppRouter } from '@routes/AppRouter';
import { useAuth } from '@contexts/auth/useAuth';
import { startShellMessageBridge } from '@utils/shellMessageBridge';
import { startShellOrderBridge } from '@features/orders/utils/shellOrderBridge';

function ShellAuthBridge() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const sendAuthStatus = () => {
      if (window.parent === window) {
        return;
      }

      window.parent.postMessage(
        {
          source: 'account',
          type: 'account:auth-status',
          detail: { isAuthenticated }
        },
        '*'
      );
    };

    const handleMessage = (event: MessageEvent<unknown>) => {
      const message = event.data as {
        source?: string;
        type?: string;
      };

      if (
        message?.source === 'shell' &&
        message.type === 'shell:request-auth-status'
      ) {
        sendAuthStatus();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isAuthenticated]);

  return null;
}

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
      <ShellAuthBridge />
      <AppRouter />
    </AppProviders>
  );
}