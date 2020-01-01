import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TranslatePipe } from './pipes/translate.pipe';
import { CustomImageUploadComponent } from './components/custom-image-upload/custom-image-upload.component';

const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgZorroAntdModule
];

const declarations = [TranslatePipe, CustomImageUploadComponent];

@NgModule({
  imports,
  declarations: [...declarations],
  exports: [
    ...imports,
    ...declarations
  ]
})
export class SharedModule { }
