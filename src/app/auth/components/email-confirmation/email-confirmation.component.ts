import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-auth-firebaseui-email-confirmation',
	templateUrl: './email-confirmation.component.html',
	styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent {
	@Input()
	email = '';

	@Input()
	goBackURL = '';
}
