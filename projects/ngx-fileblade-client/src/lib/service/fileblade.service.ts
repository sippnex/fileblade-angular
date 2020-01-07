import {Injectable, Optional} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FilebladeConfig} from '../model/fileblade-config';
import {Stack} from '../util/stack';
import {FbFile} from '../model/fb-file';
import {FbDirectory} from '../model/fb-directory';
import {FbDirectoryFactory} from '../factory/fb-directory.factory';

@Injectable({
  providedIn: 'root'
})
export class FilebladeService {

  private config: FilebladeConfig = {
    url: ''
  };

  private directoryFactory: FbDirectoryFactory = new FbDirectoryFactory();

  private uploadFinishedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, @Optional() config: FilebladeConfig) {
    if (config) {
      this.config = config;
    }
  }

  public loadDirectory(path: string): Observable<FbDirectory> {
    return this.http.get(this.config.url + '/fileblade/browse' + path).pipe(
      map(directory => this.directoryFactory.create(directory)));
  }

  public createDirectory(path: string): Observable<any> {
    return this.http.post(this.config.url + '/fileblade/browse' + path, {});
  }

  public moveElement(sourcePath: string, targetPath: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('target', targetPath);
    return this.http.put(this.config.url + '/fileblade/browse' + sourcePath, formData);
  }

  public uploadFiles(fbFiles: FbFile[]): Observable<boolean> {

    const successSubject: Subject<boolean> = new Subject<boolean>();
    const uploadStack: Stack = new Stack(fbFiles);

    const uploadFileSubscription: Observable<any> = this.uploadFile(uploadStack.pop());

    uploadFileSubscription.subscribe((success: boolean) => {
      if (uploadStack.isEmpty()) {
        successSubject.next(true);
      } else {
        this.uploadFile(uploadStack.pop());
      }
    });
    return successSubject.asObservable();
  }

  public getDownloadUrl(file: FbFile) {
    return this.config.url + '/fileblade/files' + file.path;
  }

  private uploadFile(fbFile: FbFile): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fbFile.content);
    return this.http.post(this.config.url + '/fileblade/files' + fbFile.path, formData);
  }

  /*private uploadFile(file: File, parentDirectoryId: number): Observable<boolean> {
    this.requestFileUpload(file, parentDirectoryId).subscribe((uploadId: any) => {
      this.postFile(uploadId, file).subscribe(() => {
        this.uploadFinishedSubject.next(true);
      });
    });
    return this.uploadFinishedSubject.asObservable();
  }*/

  /*private requestFileUpload(file: File, parentDirectoryId: number): Observable<any> {
    const uploadRequest = {
      'fileName': file.name,
      'parentDirectoryId': parentDirectoryId
    };
    return this.http.post(this.config.url + '/fileblade/upload-request', uploadRequest);
  }*/

}
