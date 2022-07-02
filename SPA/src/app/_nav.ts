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
        name: 'Table Sort',
        url: '/demo/marathon-form',
        icon: 'icon-puzzle'
      }
    ]
  }
];
