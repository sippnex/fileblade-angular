export abstract class FbElement {
  name: string;
  path: string;
  directory: boolean;
  selected: boolean;

  protected constructor(name: string, path: string, directory: boolean) {
    this.name = name;
    this.path = path;
    this.directory = directory;
    this.selected = false;
  }

}
