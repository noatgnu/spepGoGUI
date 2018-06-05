export class Organism {
  get upep_ref_seq_db_id(): number {
    return this._upep_ref_seq_db_id;
  }

  constructor(id: number, created_at: Date, updated_at: Date, name: string, upep_ref_seq_db_id: number) {
    this._id = id;
    this._created_at = created_at;
    this._updated_at = updated_at;
    this._name = name;
    this._upep_ref_seq_db_id = upep_ref_seq_db_id;
  }

  set upep_ref_seq_db_id(value: number) {
    this._upep_ref_seq_db_id = value;
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

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  private _id: number;
  private _created_at: Date;
  private _updated_at: Date;
  private _name: string;
  private _upep_ref_seq_db_id: number;
}
