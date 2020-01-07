import {FbDirectory} from '../model/fb-directory';
import {FbElement} from '../model/fb-element';
import {FbElementFactory} from './fb-element.factory';

export class FbDirectoryFactory {

  public create(object: any): FbDirectory {
    if (object == null) { return null; }
    const fbElementFactory: FbElementFactory = new FbElementFactory();
    const elements: FbElement[] = [];
    if (object.elements) {
      object.elements.forEach(element => {
        elements.push(fbElementFactory.create(element));
      });
    }
    return new FbDirectory(object.name, object.path, elements);
  }

}
