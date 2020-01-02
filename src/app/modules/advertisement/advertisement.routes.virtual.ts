import {Routes} from '@angular/router';

export const ADVERTISEMENT_VIRTUAL_ROUTES: Routes = [
  {
    path: 'list',
    data: {
      display: true,
      icon: 'user',
      title: 'Quảng cáo',
    }
  },
  {
    path: 'create',
    data: {
      display: true,
      title: 'Thêm quảng cáo'
    }
  },
  {
    path: ':id',
    data: {
      display: false,
      title: 'Sửa quảng cáo'
    }
  }
];
