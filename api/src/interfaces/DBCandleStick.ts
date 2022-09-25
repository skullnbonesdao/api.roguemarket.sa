export interface DBCandleStick {
  _id: RootObject_id;
  time_last: number;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
}

export interface RootObject_idTime$date {
  $numberLong: string;
}

export interface RootObject_idTime {
  $date: RootObject_idTime$date;
}

export interface RootObject_id {
  time: RootObject_idTime;
}
