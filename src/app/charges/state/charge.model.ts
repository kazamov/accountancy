import { ID } from '@datorama/akita';

export interface Charge {
  id: ID | null;
  date: Date;
  category: string;
  price: number;
  description?: string;
}

/**
 * A factory function that creates Charges
 */
export function createCharge({
  id = null, date, category, price, description
}: Partial<Charge>) {
  return {
    id,
    date,
    category,
    price,
    description
  } as Charge;
}
