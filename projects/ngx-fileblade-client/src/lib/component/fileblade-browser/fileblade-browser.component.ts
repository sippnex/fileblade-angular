import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FilenameDialogComponent} from '../../dialog/filename-dialog/filename-dialog.component';
import {FilebladeUploadDialogComponent} from '../../dialog/fileblade-upload-dialog/fileblade-upload-dialog.component';
import {FilebladeService} from '../../service/fileblade.service';
import {FbDirectory} from '../../model/fb-directory';
import {FbElement} from '../../model/fb-element';
import {FbFile} from '../../model/fb-file';
import {FilebladeSelectDirectoryDialogComponent} from '../../dialog/fileblade-select-directory-dialog/fileblade-select-directory-dialog.component';

@Component({
  selector: 'lib-fileblade-browser',
  templateUrl: './fileblade-browser.component.html',
  styleUrls: ['./fileblade-browser.component.css']
})
export class FilebladeBrowserComponent implements OnInit {

  @Input() mode = {
    name: 'browse'
  };

  @Output() onCloseDialog: EventEmitter<any> = new EventEmitter();
  @Output() onFileSelected: EventEmitter<string> = new EventEmitter();
  @Output() onDirectorySelected: EventEmitter<string> = new EventEmitter();

  directorySelected = false;
  selectedDirectory: FbDirectory;
  rootDirectorySelected = false;

  fileSelected = false;
  selectedFile: FbFile;

  currentDirectory: FbDirectory;

  constructor(private filebladeService: FilebladeService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.loadDirectory('/');
  }

  unselectAll() {
    if (this.currentDirectory) {
      this.currentDirectory.elements.forEach((element: FbElement) => {
        element.selected = false;
      });
    }
    this.directorySelected = false;
    this.fileSelected = false;
    this.selectedDirectory = null;
    this.rootDirectorySelected = false;
    this.selectedFile = null;
  }

  createDirectory() {
    if (!this.currentDirectory) { return; }
    this.dialog.open(FilenameDialogComponent, {
      data: {
        placeholder: 'New Directory'
      }
    }).afterClosed().subscribe((dialogResult: any) => {
      if (!dialogResult) { return; }
      this.filebladeService.createDirectory(this.currentDirectory.path !== '/' ? this.currentDirectory.path + '/' + dialogResult.name : this.currentDirectory.path + dialogResult.name)
        .subscribe((result: any) => {
          this.loadDirectory(this.currentDirectory.path);
        });
    });
  }

  loadDirectory(path: string) {
    this.unselectAll();
    this.filebladeService.loadDirectory(path).subscribe((directory: FbDirectory) => {
      this.currentDirectory = directory;
    });
  }

  selectElement(element: FbElement) {
    this.unselectAll();
    element.selected = true;
    if (element.directory) {
      this.directorySelected = true;
      this.selectedDirectory = <FbDirectory> element;
    } else {
      this.fileSelected = true;
      this.selectedFile = <FbFile> element;
    }
  }

  openFile(file: FbFile) {
    window.open(this.filebladeService.getDownloadUrl(file));
  }

  // select-file mode only
  returnFile(file: FbFile) {
    this.onFileSelected.emit(this.filebladeService.getDownloadUrl(file));
  }

  // select-directory mode only
  returnDirectory(directory: FbDirectory) {
    this.onDirectorySelected.emit(directory.path);
  }

  uploadFile() {
    if (!this.currentDirectory) { return; }
    this.dialog.open(FilebladeUploadDialogComponent, {
      width: '750px',
      height: '650px',
      data: {
        path: this.currentDirectory.path
      }
    }).afterClosed().subscribe(() => {
      this.loadDirectory(this.currentDirectory.path);
    });
  }

  // select-directory mode only
  selectRootElement() {
    this.unselectAll();
    this.rootDirectorySelected = true;
    this.directorySelected = true;
    this.selectedDirectory = new FbDirectory('', '/', []);
  }

  prepareMoveItem(element: FbElement) {
    if (!this.currentDirectory) { return; }
    this.dialog.open(FilebladeSelectDirectoryDialogComponent, {
      width: '750px',
      height: '650px',
      data: {
        message: 'Please select the destination directory'
      }
    }).afterClosed().subscribe((target: string) => {
      if (target == null) {
        return;
      } else if (target === '/') {
        target += element.name;
      } else {
        target += '/' + element.name;
      }
      if (element.path === target) {
        alert('The destination directory has to be different to the source directory!');
        return;
      }
      this.filebladeService.moveElement(element.path, target).subscribe(() => {
        this.loadDirectory(this.currentDirectory.path);
      });
    });
  }

  directoryUp() {
    if (!this.currentDirectory) { return; }
    const pathIndex = this.currentDirectory.path.lastIndexOf('/');
    this.loadDirectory(this.currentDirectory.path.substring(0, pathIndex)); // load parent directory
  }

  cancel() {
    this.onCloseDialog.emit();
  }

}
