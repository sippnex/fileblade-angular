import {FbElement} from './fb-element';

export class FbDirectory extends FbElement {

  elements: FbElement[];

  constructor(name: string, path: string, elements: FbElement[]) {
    super(name, path, true);
    this.elements = elements;
  }

}
