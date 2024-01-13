import { OnlineStatus } from './common';

export interface Advisor {
  name: string;
  description: string;
  imageUrl: string;
  ratings: number;
  mailRate: number;
  chatRate: number;
  onlineStatus: OnlineStatus;
}
