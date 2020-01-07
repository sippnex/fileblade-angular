import {FbElement} from '../model/fb-element';
import {FbDirectoryFactory} from './fb-directory.factory';
import {FbFileFactory} from './fb-file.factory';

export class FbElementFactory {

  public create(object: any): FbElement {
    if (object == null) { return null; }
    if (object.directory) {
      const fbDirectoryFactory: FbDirectoryFactory = new FbDirectoryFactory();
      return fbDirectoryFactory.create(object);
    } else {
      const fbFileFactory: FbFileFactory = new FbFileFactory();
      return fbFileFactory.create(object);
    }
  }

}
