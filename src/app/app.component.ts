import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {
	Router,
	NavigationStart,
	NavigationCancel,
	NavigationEnd
} from '@angular/router';

import { UiService } from './ui.service';
import { Observable } from 'rxjs';
import { AuthQuery } from './auth/state/auth.query';
import { AuthService } from './auth/state/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
	isLoading$: Observable<boolean> | null = null;
	isAuthenticated$: Observable<boolean>;

	constructor(
		private uiService: UiService,
		private router: Router,
		private authQuery: AuthQuery,
		private authService: AuthService,
		private swUpdate: SwUpdate
	) {
		this.isAuthenticated$ = this.authQuery.select(state =>
			Boolean(state.userId)
		);
		if (this.swUpdate.isEnabled) {
			this.swUpdate.available.subscribe(() => {
				if (confirm('Доступна новая версия приложения. Обновить?')) {
					window.location.reload();
				}
			});
		}
	}

	ngOnInit() {
		this.isLoading$ = this.uiService.isLoading$;
		this.uiService.showLoading();
	}

	ngAfterViewInit() {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.uiService.showLoading();
			} else if (
				event instanceof NavigationEnd ||
				event instanceof NavigationCancel
			) {
				this.uiService.hideLoading();
			}
		});
	}

	onLogout() {
		this.authService.signOut();
	}
}
