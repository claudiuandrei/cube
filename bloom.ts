export function sdbm(string: string): number {
  let hash = 0;

  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
  }

  // Convert it to an unsigned 32-bit integer.
  return hash >>> 0;
}

export function djb2a(string: string): number {
  let hash = 5_381;

  for (let index = 0; index < string.length; index++) {
    // Equivalent to: `hash * 33 ^ string.charCodeAt(i)`
    hash = ((hash << 5) + hash) ^ string.charCodeAt(index);
  }

  // Convert it to an unsigned 32-bit integer.
  return hash >>> 0;
}

export function fnv1a(string: string): number {
  let hash = 2_166_136_261;

  for (let i = 0; i < string.length; i++) {
    hash ^= string.charCodeAt(i);

    // 32-bit FNV prime: 2**24 + 2**8 + 0x93 = 16_777_619
    // Using bitshift for accuracy and performance. Numbers in JS suck.
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) +
      (hash << 24);
  }

  return hash >>> 0;
}

class BloomFilter<T extends string> {
  #storage: boolean[] = [];

  constructor(readonly size: number = 2 ** 16, entries?: readonly T[]) {
    // Initialize this by removing the first entries, they willbe evicted anyway
    if (entries == null) {
      return;
    }

    for (const key of entries) {
      this.add(key);
    }
  }

  add(key: string): this {
    // Hash items and store
    this.#hash(key).forEach((hash: number) => {
      this.#storage[hash] = true;
    });

    return this;
  }

  has(key: string): boolean {
    return this.#hash(key).every((hash: number) => this.#storage[hash]);
  }

  #hash(key: string): number[] {
    return [
      sdbm(key) % this.size,
      djb2a(key) % this.size,
      fnv1a(key) % this.size,
    ];
  }
}

export default BloomFilter;
