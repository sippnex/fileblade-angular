import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-fileblade-delete-item-dialog',
  templateUrl: './fileblade-delete-item-dialog.component.html',
  styleUrls: ['./fileblade-delete-item-dialog.component.css']
})
export class FilebladeDeleteItemDialogComponent {

  path = '';

  constructor(public dialogRef: MatDialogRef<FilebladeDeleteItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data) {
      this.path = this.data.path ? this.data.path : '';
    }
  }

  close(deletionConfirmed: boolean): void {
    this.dialogRef.close(deletionConfirmed);
  }
}
