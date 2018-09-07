import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	signUpForm: FormGroup | null = null;
	usernameControl: FormControl | null = null;
	emailControl: FormControl | null = null;
	passwordControl: FormControl | null = null;

	ngOnInit() {
		this.signUpForm = new FormGroup({});

		this.usernameControl = new FormControl('', [Validators.required]);
		this.signUpForm.registerControl('username', this.usernameControl);

		this.emailControl = new FormControl('', [
			Validators.required,
			Validators.email
		]);
		this.signUpForm.registerControl('email', this.emailControl);

		this.passwordControl = new FormControl('', [
			Validators.required,
			Validators.minLength(6),
			Validators.maxLength(25)
		]);
		this.signUpForm.registerControl('password', this.passwordControl);
	}
}
