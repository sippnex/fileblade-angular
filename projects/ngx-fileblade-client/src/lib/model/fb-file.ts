import {FbElement} from './fb-element';

export class FbFile extends FbElement {

  content: File;

  constructor(name: string, path: string, content?: File) {
    super(name, path, false);
    if (content) { this.content = content; }
  }

}
