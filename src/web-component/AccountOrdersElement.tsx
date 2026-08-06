import { mountAccountOrdersApp, unmountAccountOrdersApp } from '@app/mount';

export const ACCOUNT_ORDERS_ELEMENT_NAME = 'account-orders-microfrontend';

export class AccountOrdersElement extends HTMLElement {
  connectedCallback() {
    mountAccountOrdersApp(this);
  }

  disconnectedCallback() {
    unmountAccountOrdersApp(this);
  }
}
