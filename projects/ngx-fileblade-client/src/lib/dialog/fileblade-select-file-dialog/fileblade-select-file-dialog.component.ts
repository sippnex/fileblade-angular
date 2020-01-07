import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-fileblade-select-file-dialog',
  templateUrl: './fileblade-select-file-dialog.component.html',
  styleUrls: ['./fileblade-select-file-dialog.component.css']
})
export class FilebladeSelectFileDialogComponent {

  constructor(public dialogRef: MatDialogRef<FilebladeSelectFileDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data == null) {
      this.data = {
        message: null
      };
    }
    if (this.data.message == null) {
      this.data.message = 'Please select a file';
    }
  }

  fileSelected(downloadUrl: string) {
    this.dialogRef.close(downloadUrl);
  }

  close(): void {
    this.dialogRef.close();
  }

}
