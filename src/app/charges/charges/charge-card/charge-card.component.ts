import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICharge } from 'data';

@Component({
	selector: 'app-charge-card',
	templateUrl: './charge-card.component.html',
	styleUrls: ['./charge-card.component.scss']
})
export class ChargeCardComponent {
	@Input()
	charge: ICharge | null = null;
	@Output()
	deleteCharge = new EventEmitter<string>();

	onDelete(event: MouseEvent) {
		if (this.charge) {
			this.deleteCharge.emit(this.charge.id);
		}

		event.cancelBubble = true;
		event.stopPropagation();

		return false;
	}
}
