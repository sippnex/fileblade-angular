import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-fileblade-upload-dialog',
  templateUrl: './fileblade-upload-dialog.component.html',
  styleUrls: ['./fileblade-upload-dialog.component.css']
})
export class FilebladeUploadDialogComponent {

  constructor(public dialogRef: MatDialogRef<FilebladeUploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  close(): void {
    this.dialogRef.close();
  }

}
