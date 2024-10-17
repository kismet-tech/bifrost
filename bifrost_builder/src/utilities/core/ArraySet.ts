export class ArraySet<T> {
  private items: T[][] = [];

  add(array: T[]): void {
    if (!this.has(array)) {
      this.items.push(array);
    }
  }

  delete(array: T[]): boolean {
    const index = this.items.findIndex((item: T[]) =>
      this.areArraysEqual(item, array)
    );
    if (index !== -1) {
      this.items.splice(index, 1); // Remove the array at the found index
      return true;
    }
    return false; // Return false if the array was not found
  }

  has(array: T[]): boolean {
    return this.items.some((item) => this.areArraysEqual(item, array));
  }

  get size(): number {
    return this.items.length;
  }

  /** Returns the elements of the set as an array */
  toArray(): T[][] {
    return [...this.items]; // Returns a shallow copy of the items array
  }

  private areArraysEqual(a: T[], b: T[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((value, index) => value === b[index]);
  }
}
