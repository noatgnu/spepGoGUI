export class UpepRefSeqDb {
  constructor(ID: number, CreatedAt: Date, UpdatedAt: Date, Name: string, Version: number) {
    this._ID = ID;
    this._CreatedAt = CreatedAt;
    this._UpdatedAt = UpdatedAt;
    this._Name = Name;
    this._Version = Version;
  }
  private _ID: number;
  private _CreatedAt: Date;
  private _UpdatedAt: Date;

  get ID(): number {
    return this._ID;
  }

  set ID(value: number) {
    this._ID = value;
  }

  get CreatedAt(): Date {
    return this._CreatedAt;
  }

  set CreatedAt(value: Date) {
    this._CreatedAt = value;
  }

  get UpdatedAt(): Date {
    return this._UpdatedAt;
  }

  set UpdatedAt(value: Date) {
    this._UpdatedAt = value;
  }

  get Name(): string {
    return this._Name;
  }

  set Name(value: string) {
    this._Name = value;
  }

  get Version(): number {
    return this._Version;
  }

  set Version(value: number) {
    this._Version = value;
  }

  private _Name: string;
  private _Version: number;
}
