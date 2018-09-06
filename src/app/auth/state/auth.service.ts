import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private authStore: AuthStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get(url).subscribe((entities) => {
      // this.{authStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity) => {
      // this.{authStore.add(entity);
    // });
  }

}
