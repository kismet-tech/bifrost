export class ArraySet<T> {
  private items: T[][] = [];

  add(array: T[]): void {
    if (!this.has(array)) {
      this.items.push(array);
    }
  }

  has(array: T[]): boolean {
    return this.items.some((item) => this.areArraysEqual(item, array));
  }

  get size(): number {
    return this.items.length;
  }

  private areArraysEqual(a: T[], b: T[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((value, index) => value === b[index]);
  }

  /** Returns the elements of the set as an array */
  toArray(): T[][] {
    return [...this.items]; // Returns a shallow copy of the items array
  }
}
