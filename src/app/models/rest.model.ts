export interface PaginationMeta {
  current_page: number;
  last_page: number;
  limit: number;
  next_url: string;
  prev_url: string;
  total: number;
}

export interface Rest<T> {
  status: number;
  message: string;
  data?: T;
  datas?: T[];
  meta?: PaginationMeta;
}
