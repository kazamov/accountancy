import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../state/auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
	signInForm: FormGroup | null = null;
	emailControl: FormControl | null = null;
	passwordControl: FormControl | null = null;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.signInForm = new FormGroup({});

		this.emailControl = new FormControl('', [Validators.required]);
		this.signInForm.registerControl('email', this.emailControl);

		this.passwordControl = new FormControl('', [Validators.required]);
		this.signInForm.registerControl('password', this.passwordControl);
	}

	onSubmit() {
		if (this.emailControl && this.passwordControl) {
			this.authService.signIn(
				this.emailControl.value,
				this.passwordControl.value
			);
		}
	}
}
