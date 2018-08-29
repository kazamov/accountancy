import { ID } from '@datorama/akita';

export interface Charge {
  id: ID | null;
  date: Date;
  category: string;
  price: number;
  description?: string;
}
