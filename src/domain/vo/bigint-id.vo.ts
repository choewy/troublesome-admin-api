export class BigIntId {
  constructor(private readonly id: number | string | bigint) {}

  get value() {
    return BigInt(this.id);
  }

  isEqual(other: BigIntId) {
    return this.value === other.value;
  }
}
