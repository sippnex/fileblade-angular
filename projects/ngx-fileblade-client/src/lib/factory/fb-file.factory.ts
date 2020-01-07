import {FbFile} from '../model/fb-file';

export class FbFileFactory {

  public create(object: any): FbFile {
    if (object == null) { return null; }
    return new FbFile(object.name, object.path);
  }

}
