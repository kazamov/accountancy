import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

//import { ChargesStore } from './charges.store';
import { ChargesModule } from '../charges.module';

@Injectable({ providedIn: ChargesModule })
export class ChargesDataService {
	/*constructor(private chargesStore: ChargesStore,
    private http: HttpClient) {
    }*/

	get() {
		// this.http.get(url).subscribe((entities) => {
		// this.{chargesStore.set(entities);
		// });
	}

	add() {
		// this.http.post().subscribe((entity) => {
		// this.{chargesStore.add(entity);
		// });
	}
}
