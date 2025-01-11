import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { Store } from '../pages/Store';
import { ThankYou } from '../pages/ThankYou';
import { PaymentPlaceholder } from '../pages/PaymentPlaceholder';

export const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/store',
    component: Store
  },
  {
    path: '/thank-you',
    component: ThankYou
  },
  {
    path: '/payment/:bundle',
    component: PaymentPlaceholder
  }
];