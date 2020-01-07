import {Directive, ElementRef, HostListener} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FilebladeBrowserDialogComponent} from '../dialog/fileblade-browser-dialog/fileblade-browser-dialog.component';

@Directive({
  selector: '[libFilebladeBrowser]'
})
export class FilebladeBrowserDirective {

  constructor(private el: ElementRef, private dialog: MatDialog) {
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.openFilebladeBrowserDialog();
  }

  openFilebladeBrowserDialog(): void {
    this.dialog.open(FilebladeBrowserDialogComponent, {
      width: '750px',
      height: '650px'
    });
  }

}
