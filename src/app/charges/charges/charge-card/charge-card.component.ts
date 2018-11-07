import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ID } from '@datorama/akita';

import { ICharge } from '../../state/charge.model';

@Component({
	selector: 'app-charge-card',
	templateUrl: './charge-card.component.html',
	styleUrls: ['./charge-card.component.scss']
})
export class ChargeCardComponent {
	@Input()
	charge: ICharge | null = null;
	@Output()
	deleteCharge = new EventEmitter<ID>();

	onDelete() {
		if (this.charge) {
			this.deleteCharge.emit(this.charge.id);
		}
	}
}
