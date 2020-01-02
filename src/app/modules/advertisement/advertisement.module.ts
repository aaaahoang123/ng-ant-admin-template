import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { AdvertisementFormComponent } from './advertisement-form/advertisement-form.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ADVERTISEMENT_ROUTES} from './advertisement.routes';
import {AdvertisementTableRowComponent} from './advertisement-list/components/advertisement-table-row.component';



@NgModule({
  declarations: [
    AdvertisementListComponent,
    AdvertisementFormComponent,
    AdvertisementTableRowComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ADVERTISEMENT_ROUTES)
  ]
})
export class AdvertisementModule { }
