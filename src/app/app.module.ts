import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NZ_CONFIG, NZ_I18N, NzConfig, vi_VN} from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpClientInterceptor} from './utils/http';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {StoreModule} from '@ngrx/store';
import {mainReducer} from './store/main.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MainEffects} from './store/main.effects';
import {advertisementReducer} from './modules/advertisement/store/advertisement.reducer';
import {AdvertisementEffects} from './modules/advertisement/store/advertisement.effects';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    SharedModule,
    StoreModule.forRoot({
      main: mainReducer,
      advertisement: advertisementReducer
    }),
    EffectsModule.forRoot([MainEffects, AdvertisementEffects]),
    AppRoutingModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: vi_VN},
    {
      provide: NZ_CONFIG,
      useValue: {
        notification: {
          nzPlacement: 'bottomRight'
        },
        message: {
          nzTop: '90%'
        }
      } as NzConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
