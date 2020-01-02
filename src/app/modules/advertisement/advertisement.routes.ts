import {Routes} from '@angular/router';
import {AdvertisementListComponent} from './advertisement-list/advertisement-list.component';
import {AdvertisementFormComponent} from './advertisement-form/advertisement-form.component';

export const ADVERTISEMENT_ROUTES: Routes = [
  {
    path: 'list',
    component: AdvertisementListComponent,
    data: {
      display: true,
      icon: 'user',
      title: 'Quảng cáo',
    }
  },
  {
    path: 'create',
    component: AdvertisementFormComponent,
    data: {
      display: true,
      title: 'Thêm quảng cáo'
    }
  },
  {
    path: ':id',
    component: AdvertisementFormComponent,
    data: {
      display: false,
      title: 'Sửa quảng cáo'
    }
  }
];
