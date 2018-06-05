export class Sorf {
  constructor(id: number, created_at: Date, updated_at: Date, starting_position: number, ending_position: number) {
    this._id = id;
    this._created_at = created_at;
    this._updated_at = updated_at;
    this._starting_position = starting_position;
    this._ending_position = ending_position;
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

  get starting_position(): number {
    return this._starting_position;
  }

  set starting_position(value: number) {
    this._starting_position = value;
  }

  get ending_position(): number {
    return this._ending_position;
  }

  set ending_position(value: number) {
    this._ending_position = value;
  }
  private _id: number;
  private _created_at: Date;
  private _updated_at: Date;
  private _starting_position: number;
  private _ending_position: number;
}
