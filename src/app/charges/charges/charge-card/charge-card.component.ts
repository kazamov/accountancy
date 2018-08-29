import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICharge } from '../../charge.interface';

@Component({
	selector: 'app-charge-card',
	templateUrl: './charge-card.component.html',
	styleUrls: ['./charge-card.component.css']
})
export class ChargeCardComponent {
	@Input()
	charge: ICharge | null = null;
	@Output()
	deleteCard = new EventEmitter<string>();

	onDelete() {
		if (this.charge) {
			this.deleteCard.emit(this.charge.id);
		}
	}
}
