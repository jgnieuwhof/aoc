export class SetById<T extends { id: string }> {
  private set = new Set<string>();
  private objects: Record<string, T[]> = {};

  private sort(ids: string[]) {
    return ids.concat([]).sort();
  }

  private key(objects: T[]): string {
    return JSON.stringify(
      this.sort(
        objects.map((x) => x.id),
      ),
    );
  }

  add(objects: T[]) {
    const key = this.key(objects);
    this.objects[key] = objects;
    return this.set.add(key);
  }

  has(objects: T[]) {
    return this.set.has(this.key(objects));
  }

  *[Symbol.iterator]() {
    for (const value of Object.values(this.objects)) {
      yield value;
    }
  }
}
