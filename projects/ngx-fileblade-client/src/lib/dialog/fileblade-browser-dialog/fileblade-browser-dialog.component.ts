import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-fileblade-browser-dialog',
  templateUrl: './fileblade-browser-dialog.component.html',
  styleUrls: ['./fileblade-browser-dialog.component.css']
})
export class FilebladeBrowserDialogComponent {

  constructor(public dialogRef: MatDialogRef<FilebladeBrowserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  close(): void {
    this.dialogRef.close();
  }

}
