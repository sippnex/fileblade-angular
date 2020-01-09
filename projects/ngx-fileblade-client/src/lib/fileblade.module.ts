import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { FilebladeBrowserComponent } from './component/fileblade-browser/fileblade-browser.component';
import { FilebladeInputComponent } from './component/fileblade-input/fileblade-input.component';
import { FilebladeUploadComponent } from './component/fileblade-upload/fileblade-upload.component';
import { FilebladeBrowserDirective } from './directive/fileblade-browser.directive';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule} from '@angular/material';
import {FilebladeBrowserDialogComponent} from './dialog/fileblade-browser-dialog/fileblade-browser-dialog.component';
import {FilenameDialogComponent} from './dialog/filename-dialog/filename-dialog.component';
import {FilebladeSelectFileDialogComponent} from './dialog/fileblade-select-file-dialog/fileblade-select-file-dialog.component';
import { FilebladeSelectDirectoryDialogComponent } from './dialog/fileblade-select-directory-dialog/fileblade-select-directory-dialog.component';
import {FilebladeUploadDialogComponent} from './dialog/fileblade-upload-dialog/fileblade-upload-dialog.component';
import {FilebladeRenameItemDialogComponent} from './dialog/fileblade-rename-item-dialog/fileblade-rename-item-dialog.component';
import {FilebladeService} from './service/fileblade.service';
import {FilebladeConfig} from './model/fileblade-config';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FilebladeDeleteItemDialogComponent} from './dialog/fileblade-delete-item-dialog/fileblade-delete-item-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule
  ],
  declarations: [
    FilebladeUploadComponent,
    FilebladeBrowserComponent,
    FilebladeBrowserDialogComponent,
    FilenameDialogComponent,
    FilebladeSelectFileDialogComponent,
    FilebladeSelectDirectoryDialogComponent,
    FilebladeRenameItemDialogComponent,
    FilebladeDeleteItemDialogComponent,
    FilebladeUploadDialogComponent,
    FilebladeBrowserDirective,
    FilebladeInputComponent,
  ],
  exports: [
    FilebladeUploadComponent,
    FilebladeBrowserComponent,
    FilebladeBrowserDialogComponent,
    FilenameDialogComponent,
    FilebladeSelectFileDialogComponent,
    FilebladeSelectDirectoryDialogComponent,
    FilebladeRenameItemDialogComponent,
    FilebladeDeleteItemDialogComponent,
    FilebladeUploadDialogComponent,
    FilebladeBrowserDirective,
    FilebladeInputComponent
  ],
  entryComponents: [
    FilebladeBrowserDialogComponent,
    FilenameDialogComponent,
    FilebladeUploadDialogComponent,
    FilebladeSelectFileDialogComponent,
    FilebladeSelectDirectoryDialogComponent,
    FilebladeRenameItemDialogComponent,
    FilebladeDeleteItemDialogComponent
  ],
  providers: [
    FilebladeService
  ]
})
export class FilebladeModule {

  constructor (@Optional() @SkipSelf() parentModule: FilebladeModule) {
    if (parentModule) {
      throw new Error(
        'FilebladeModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: FilebladeConfig): ModuleWithProviders {
    return {
      ngModule: FilebladeModule,
      providers: [
        {provide: FilebladeConfig, useValue: config }
      ]
    };
  }

}
