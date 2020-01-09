import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-fileblade-rename-item-dialog',
  templateUrl: './fileblade-rename-item-dialog.component.html',
  styleUrls: ['./fileblade-rename-item-dialog.component.css']
})
export class FilebladeRenameItemDialogComponent {

  title = '';
  name = '';

  constructor(public dialogRef: MatDialogRef<FilebladeRenameItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data) {
      this.title = this.data.message ? this.data.message : 'Please type in a name';
      this.name = this.data.name ? this.data.name : '';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
