import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Charge } from './charge.model';
import { ChargesModule } from '../charges.module';

export interface ChargesState extends EntityState<Charge> { }

@Injectable({ providedIn: ChargesModule })
@StoreConfig({ name: 'charges' })
export class ChargesStore extends EntityStore<ChargesState, Charge> {

  constructor() {
    super();
  }

}

