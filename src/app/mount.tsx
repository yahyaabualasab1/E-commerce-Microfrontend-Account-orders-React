import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { App } from '@app/App';

const roots = new WeakMap<Element, Root>();

export function mountAccountOrdersApp(containerOrId: Element | string): Root {
  const container =
    typeof containerOrId === 'string' ? document.getElementById(containerOrId) : containerOrId;

  if (!container) {
    throw new Error('Account & Orders root container was not found.');
  }

  const existingRoot = roots.get(container);

  if (existingRoot) {
    existingRoot.render(<App />);
    return existingRoot;
  }

  const root = createRoot(container);
  roots.set(container, root);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  return root;
}

export function unmountAccountOrdersApp(container: Element): void {
  const root = roots.get(container);

  if (!root) {
    return;
  }

  root.unmount();
  roots.delete(container);
}
