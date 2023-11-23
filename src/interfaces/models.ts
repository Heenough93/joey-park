export type RequestData<T> = { data: T };
export type ResponseData<T> = { data: T };

export type OffsetRequestData<T> = { data: T } & PaginationInfo;
export type OffsetResponseData<T> = { data: T } & PaginationInfo;

export type DBType = { Visitors: Visitor[], Messages: Message[] };

export interface PaginationInfo {
  total: number,
  offset: number,
  limit: number,
}

export interface Visitor {
  appName: string,
  platform: string,
  userAgent: string,
  country_code: string,
  country_name: string,
  city: string,
  postal: string,
  latitude: number,
  longitude: number,
  IPv4: string,
  state: string,
  id: string,
  date: string,
}

export interface Message {
  name: string,
  email: string,
  subject: string,
  message: string,
  id: string,
  date: string,
}