export class FtpEntry {
  constructor(Name: string, Type: number, Size: number, Time: Date) {
    this._Name = Name;
    this._Type = Type;
    this._Size = Size;
    this._Time = Time;
  }
  get Name(): string {
    return this._Name;
  }

  set Name(value: string) {
    this._Name = value;
  }

  get Type(): number {
    return this._Type;
  }

  set Type(value: number) {
    this._Type = value;
  }

  get Size(): number {
    return this._Size;
  }

  set Size(value: number) {
    this._Size = value;
  }

  get Time(): Date {
    return this._Time;
  }

  set Time(value: Date) {
    this._Time = value;
  }
  private _Name: string;
  private _Type: number;
  private _Size: number;
  private _Time: Date;
}
