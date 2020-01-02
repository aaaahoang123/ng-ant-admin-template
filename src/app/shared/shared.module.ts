import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TranslatePipe } from './pipes/translate.pipe';
import { CustomImageUploadComponent } from './components/custom-image-upload/custom-image-upload.component';
import {ConnectFormDirective} from './directives/connect-form.directive';

const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgZorroAntdModule
];

const declarations = [
  TranslatePipe,
  CustomImageUploadComponent,
  ConnectFormDirective
];

@NgModule({
  imports,
  declarations: [...declarations],
  exports: [
    ...imports,
    ...declarations
  ]
})
export class SharedModule { }
