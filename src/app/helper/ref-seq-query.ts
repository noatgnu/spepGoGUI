import {UpepRefSeqDb} from "./upep-ref-seq-db";
import {FtpEntry} from "./ftp-entry";

export class RefSeqQuery {
  get ReleaseMap(): Map<string, string> {
    return this._ReleaseMap;
  }

  set ReleaseMap(value: Map<string, string>) {
    this._ReleaseMap = value;
  }
  constructor(CurrentDB: UpepRefSeqDb[], FileListMap: Map<string, FtpEntry[]>, RemoteDB: number, ReleaseMap: Map<string, string>) {
    this._CurrentDB = CurrentDB;
    this._FileListMap = FileListMap;
    this._RemoteDB = RemoteDB;
    this._ReleaseMap = ReleaseMap;
  }
  get CurrentDB(): UpepRefSeqDb[] {
    return this._CurrentDB;
  }

  set CurrentDB(value: UpepRefSeqDb[]) {
    this._CurrentDB = value;
  }

  get FileListMap(): Map<string, FtpEntry[]> {
    return this._FileListMap;
  }

  set FileListMap(value: Map<string, FtpEntry[]>) {
    this._FileListMap = value;
  }

  get RemoteDB(): number {
    return this._RemoteDB;
  }

  set RemoteDB(value: number) {
    this._RemoteDB = value;
  }
  private _CurrentDB: UpepRefSeqDb[];
  private _FileListMap: Map<string, FtpEntry[]>;
  private _RemoteDB: number;
  private _ReleaseMap: Map<string, string>;
}
