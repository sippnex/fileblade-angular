export class Stack {

  private readonly elements: any[];

  constructor(elements: any[]) {
    this.elements = elements;
  }

  push(element: any): void {
    this.elements.push(element);
  }

  pop(): any {
    if (this.isEmpty()) {
      return null;
    }
    const element = this.elements[0];
    this.elements.splice(0, 1);
    return element;
  }

  isEmpty(): boolean {
    return (this.elements.length === 0);
  }

}
