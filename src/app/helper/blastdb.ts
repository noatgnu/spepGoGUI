export class BlastDB {
  constructor(id: number, created_at: Date, updated_at: Date, upep_ref_seq_db_id: number, starting_codon_id: number, ending_codon_id: number) {
    this._id = id;
    this._created_at = created_at;
    this._updated_at = updated_at;
    this._upep_ref_seq_db_id = upep_ref_seq_db_id;
    this._starting_codon_id = starting_codon_id;
    this._ending_codon_id = ending_codon_id;
  }
  get upep_ref_seq_db_id(): number {
    return this._upep_ref_seq_db_id;
  }

  set upep_ref_seq_db_id(value: number) {
    this._upep_ref_seq_db_id = value;
  }

  get starting_codon_id(): number {
    return this._starting_codon_id;
  }

  set starting_codon_id(value: number) {
    this._starting_codon_id = value;
  }

  get ending_codon_id(): number {
    return this._ending_codon_id;
  }

  set ending_codon_id(value: number) {
    this._ending_codon_id = value;
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

  private _id: number;
  private _created_at: Date;
  private _updated_at: Date;
  private _upep_ref_seq_db_id: number;
  private _starting_codon_id: number;
  private _ending_codon_id: number

}
