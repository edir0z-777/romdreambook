import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { Store } from '../pages/Store';

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
  }
];