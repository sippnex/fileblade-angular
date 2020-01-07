import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-fileblade-select-directory-dialog',
  templateUrl: './fileblade-select-directory-dialog.component.html',
  styleUrls: ['./fileblade-select-directory-dialog.component.css']
})
export class FilebladeSelectDirectoryDialogComponent {

  constructor(public dialogRef: MatDialogRef<FilebladeSelectDirectoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data == null) {
      this.data = {
        message: null
      };
    }
    if (this.data.message == null) {
      this.data.message = 'Please select a directory';
    }
  }

  directorySelected(path: string) {
    this.dialogRef.close(path);
  }

  close(): void {
    this.dialogRef.close();
  }

}
