import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Demo',
    url: '/demo',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Marathon Form',
        url: '/demo/marathon-form',
        icon: 'icon-puzzle'
      }
    ]
  }
];
