import { useCallback, useEffect, useRef, useState } from 'react';

import { getErrorMessage } from '@utils/asyncError';

type AsyncResourceState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type UseAsyncResourceOptions = {
  errorMessage: string;
};

export function useAsyncResource<T>(loader: () => Promise<T>, options: UseAsyncResourceOptions) {
  const requestIdRef = useRef(0);
  const [state, setState] = useState<AsyncResourceState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(() => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setState((currentState) => ({
      ...currentState,
      loading: true,
      error: null,
    }));

    void loader()
      .then((data) => {
        if (requestIdRef.current === requestId) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (requestIdRef.current === requestId) {
          setState({
            data: null,
            loading: false,
            error: getErrorMessage(error, options.errorMessage),
          });
        }
      });
  }, [loader, options.errorMessage]);

  useEffect(() => {
    load();

    return () => {
      requestIdRef.current += 1;
    };
  }, [load]);

  return {
    ...state,
    reload: load,
    setData: (data: T) => setState({ data, loading: false, error: null }),
  };
}
