import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';
import { Auth } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthQuery extends QueryEntity<AuthState, Auth> {

  constructor(protected store: AuthStore) {
    super(store);
  }

}
