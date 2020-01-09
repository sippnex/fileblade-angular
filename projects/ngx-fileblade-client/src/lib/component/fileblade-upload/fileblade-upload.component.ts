import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilebladeService} from '../../service/fileblade.service';
import {FbFile} from '../../model/fb-file';

@Component({
  selector: 'lib-fileblade-upload',
  templateUrl: './fileblade-upload.component.html',
  styleUrls: ['./fileblade-upload.component.css']
})
export class FilebladeUploadComponent {

  @Input() path: string;

  @Output() closeDialog: EventEmitter<any> = new EventEmitter();

  currentFiles: FbFile[] = [];
  uploading = false;

  constructor(private filebladeService: FilebladeService) { }

  removeSelectedFile(file, fileInput) {
    for (let i = 0; i < this.currentFiles.length; i++) {
      if (file.name === this.currentFiles[i].name) {
        this.currentFiles.splice(i, 1);
        fileInput.value = '';
        return;
      }
    }
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      let exists = false;
      for (let j = 0; j < this.currentFiles.length; j++) {
        if (fileList[i].name === this.currentFiles[j].name) {
          exists = true;
        }
      }
      if (!exists) {
        this.currentFiles.push(new FbFile(fileList[i].name, this.path + (this.path !== '/' ? '/' : '') + fileList[i].name, fileList[i]));
      } else {
        alert('File already selected!');
      }
    }
  }

  uploadFiles() {
    if (this.currentFiles.length === 0) {
      return;
    }
    this.uploading = true;
    this.filebladeService.uploadFiles(this.currentFiles).subscribe((success: boolean) => {
      this.uploading = false;
      if (success) {
        alert('File uploaded successfully!');
      } else {
        alert('File upload failed!');
      }
      this.closeDialog.emit();
    });
  }

  cancel() {
    this.closeDialog.emit();
  }

}
