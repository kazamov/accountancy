import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { ChargesStore, ChargesState } from './charges.store';
import { Charge } from './charge.model';
import { ChargesModule } from '../charges.module';

@Injectable({ providedIn: ChargesModule })
export class ChargesQuery extends QueryEntity<ChargesState, Charge> {

  constructor(protected store: ChargesStore) {
    super(store);
  }

}
