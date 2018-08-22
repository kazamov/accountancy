import { Component, OnInit } from '@angular/core';

import { ChargesService } from '../charges.service';
import { ICharge } from '../charge.interface';

@Component({
	selector: 'app-charges',
	templateUrl: './charges.component.html',
	styleUrls: ['./charges.component.css']
})
export class ChargesComponent implements OnInit {
	charges: ICharge[] = [];

	constructor(private chargesService: ChargesService) {
		this.charges = this.chargesService.getCharges();
	}

	ngOnInit() {}
}
