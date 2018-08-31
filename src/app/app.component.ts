import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
	Router,
	NavigationStart,
	NavigationCancel,
	NavigationEnd
} from '@angular/router';

import { UiService } from './ui.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
	isLoading$: Observable<boolean> | null = null;

	constructor(private uiService: UiService, private router: Router) {}

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
}
