import {
  ACCOUNT_ORDERS_ELEMENT_NAME,
  AccountOrdersElement,
} from '@web-component/AccountOrdersElement';

export function registerAccountOrdersElement() {
  if (!customElements.get(ACCOUNT_ORDERS_ELEMENT_NAME)) {
    customElements.define(ACCOUNT_ORDERS_ELEMENT_NAME, AccountOrdersElement);
  }
}
