import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-filename-dialog',
  templateUrl: './filename-dialog.component.html',
  styleUrls: ['./filename-dialog.component.css']
})
export class FilenameDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FilenameDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (!this.data.placeholder) {
      this.data.placeholder = 'Enter name';
    }
    if (!this.data.value) {
      this.data.value = '';
    }
  }

  cancel(e) {
    e.preventDefault();
    this.dialogRef.close();
  }

  save(e, name: string) {
    e.preventDefault();
    this.dialogRef.close({name: name});
  }

}
