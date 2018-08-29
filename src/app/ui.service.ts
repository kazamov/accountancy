import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UiService {
	isLoading$ = new Subject<boolean>();

	showLoading() {
		this.isLoading$.next(true);
	}

	hideLoading() {
		this.isLoading$.next(false);
	}
}
