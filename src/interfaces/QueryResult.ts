import { QueryResultBase } from "pg";

export interface QueryResult<RowT = any> extends QueryResultBase {
  rows: RowT[];
}
