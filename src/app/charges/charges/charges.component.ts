import {
	Component,
	TrackByFunction,
	ViewChild,
	OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, Subscription } from 'rxjs';
import { ICharge } from 'data';

import { ChargesQuery } from '../state/charges.query';
import { ChargesService } from '../state/charges.service';

@Component({
	selector: 'app-charges',
	templateUrl: './charges.component.html',
	styleUrls: ['./charges.component.scss']
})
export class ChargesComponent implements OnDestroy {
	charges$: Observable<ICharge[]>;
	count$: Observable<number>;
	allChargesLoaded$: Observable<boolean>;
	chargesSubscription: Subscription;

	@ViewChild(CdkVirtualScrollViewport, { static: false })
	viewport: CdkVirtualScrollViewport | null = null;

	private processingLoading = false;

	constructor(
		private chargesService: ChargesService,
		private chargesQuery: ChargesQuery,
		private router: Router
	) {
		this.count$ = this.chargesQuery.selectCount();
		this.charges$ = this.chargesQuery.selectAll();
		this.chargesSubscription = this.charges$.subscribe(
			() => (this.processingLoading = false)
		);
		this.allChargesLoaded$ = this.chargesQuery.allChargesLoaded$;
	}

	onDeleteCard(chargeId: string) {
		this.chargesService.deleteCharge(chargeId);
	}

	onEditCharge(chargeId: string) {
		this.router.navigate(['/charges', 'charge', chargeId]);
	}

	onLoadMoreCharges() {
		if (this.viewport) {
			if (
				this.chargesQuery.getValue().ui.allItemsLoaded ||
				this.processingLoading
			) {
				return;
			}

			const end = this.viewport.getRenderedRange().end;
			const total = this.viewport.getDataLength();

			if (end >= total - 2 || end === total) {
				this.processingLoading = true;
				this.chargesService.getCharges();
			}
		}
	}

	trackBy: TrackByFunction<ICharge> = (_: number, item: ICharge) => {
		return item.id;
	};

	ngOnDestroy() {
		this.chargesSubscription.unsubscribe();
	}
}
