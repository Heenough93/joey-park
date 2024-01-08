export type RequestData<T> = { data: T };
export type ResponseData<T> = { data: T };

export type OffsetRequestData<T> = { data: T } & PaginationInfo;
export type OffsetResponseData<T> = { data: T } & PaginationInfo;

export type DBType = { Visitors: Visitor[], Messages: Message[], Stocks: Stock[], HoldingStocks: HoldingStock[] };

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


export type MarketType = 'domestic' | 'worldstock';

export interface Stock {
  code: string,                        // 종목코드
  name: string,                        // 종목명
  symbol: string,                      // 종목심볼 (for 크롤링)
  marketType: MarketType,              // 시장타입
}

export interface HoldingStock {
  sequence: number,                    // 시퀀스
  stockCode: string,                   // 종목코드
  stockHoldings: number,               // 보유수량
  buyingDate: Date,                    // 매수일
  buyingPrice: number,                 // 매수단가
  targetDate: Date,                    // 목표일
  targetPrice: number,                 // 목표가
  currency: string,                    // 통화
  rateOfExchange: string,              // 환율
  marketType: MarketType,              // 시장타입
  stockFirmName: string,               // 증권사명
  source: string,                      // 자금 출처
}

export interface ScrapedStockInfo {
  stockCode: string,                   // 종목코드
  stockName: string,                   // 종목명
  currentDate: Date,                   // 현재일
  currentPrice: number,                // 현재가
  previousDate: Date,                  // 전일
  previousClosePrice: number,          // 전일종가
}

export interface HoldingStockRdo extends Omit<HoldingStock, 'sequence'> {
  // 조인
  stockName: string,                   // 종목명
  // 크롤링
  currentDate: Date,                   // 현재일
  currentPrice: number,                // 현재가
  previousDate: Date,                  // 전일
  previousClosePrice: number,          // 전일종가
  // 계산
  buyingAmount: number,                // 매수금액
  currentAmount: number,               // 현재평가금액
  currentProfitAndLoss: number,        // 현재평가손익
  currentRateOfReturn: string,         // 현재수익률
  previousAmount: number,              // 전일평가금액
  previousProfitAndLoss: number,       // 전일평가손익
  previousRateOfReturn: string,        // 전일수익률
  targetAmount: number,                // 목표평가금액
  targetProfitAndLoss: number,         // 목표평가손익
  targetRateOfReturn: string,          // 목표수익률
}