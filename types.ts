
export enum AppState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  ERROR = 'ERROR',
}

export interface HoroscopeResult {
  isAppam: boolean;
  zodiacName: string;
  horoscope: string;
  rejectionReason: string;
}
