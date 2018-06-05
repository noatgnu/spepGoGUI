export class UpepCodon {
  constructor(id: number, created_at: Date, updated_at: Date, starting_codon: boolean, ending_codon: boolean, sequence: string) {
    this._id = id;
    this._created_at = created_at;
    this._updated_at = updated_at;
    this._starting_codon = starting_codon;
    this._ending_codon = ending_codon;
    this._sequence = sequence;
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get created_at(): Date {
    return this._created_at;
  }

  set created_at(value: Date) {
    this._created_at = value;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  set updated_at(value: Date) {
    this._updated_at = value;
  }

  get starting_codon(): boolean {
    return this._starting_codon;
  }

  set starting_codon(value: boolean) {
    this._starting_codon = value;
  }

  get ending_codon(): boolean {
    return this._ending_codon;
  }

  set ending_codon(value: boolean) {
    this._ending_codon = value;
  }

  get sequence(): string {
    return this._sequence;
  }

  set sequence(value: string) {
    this._sequence = value;
  }
  private _id: number;
  private _created_at: Date;
  private _updated_at: Date;
  private _starting_codon: boolean;
  private _ending_codon: boolean;
  private _sequence: string;
}
