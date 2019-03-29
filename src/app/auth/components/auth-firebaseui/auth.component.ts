import {
	Component,
	Inject,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	SimpleChanges
} from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import {
	AuthProcessService,
	AuthProvider
} from '../../services/auth-process.service';

export const EMAIL_REGEX = new RegExp(
	[
		'^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
		'|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
		'[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+',
		'[a-zA-Z]{2,}))$'
	].join('')
);

@Component({
	selector: 'app-auth-firebaseui',
	templateUrl: 'auth.component.html',
	styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit, OnChanges, OnDestroy {
	@Input()
	appearance: MatFormFieldAppearance = 'standard';

	@Input()
	tabIndex: number | null = null;

	@Input()
	registrationEnabled = true;

	@Input()
	resetPasswordEnabled = true;

	@Input()
	goBackURL = '';

	@Input()
	messageOnAuthSuccess = '';

	@Input()
	messageOnAuthError = '';

	passwordResetWished = false;

	public signInFormGroup: FormGroup = new FormGroup({});
	public signUpFormGroup: FormGroup = new FormGroup({});
	public resetPasswordFormGroup: FormGroup = new FormGroup({});

	onErrorSubscription: Subscription = Subscription.EMPTY;
	authenticationError = false;

	passReset = false;

	authProviders = AuthProvider;

	signInEmailFormControl: AbstractControl = new FormControl();
	sigInPasswordFormControl: AbstractControl = new FormControl();

	sigUpEmailFormControl: AbstractControl = new FormControl();
	sigUpPasswordFormControl: AbstractControl = new FormControl();
	sigUpPasswordConfirmationFormControl: AbstractControl = new FormControl();
	resetPasswordEmailFormControl: AbstractControl = new FormControl();

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		public auth: AngularFireAuth,
		public authProcess: AuthProcessService
	) {}

	public ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.onErrorSubscription = this.authProcess.onErrorEmitter.subscribe(
				() => (this.authenticationError = true)
			);
		}
		this.updateAuthSnackbarMessages();
		// auth form's initialization
		this._initSignInFormGroupBuilder();
		this._initSignUpFormGroupBuilder();
		this._initResetPasswordFormGroupBuilder();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.messageOnAuthSuccess || changes.messageOnAuthError) {
			this.updateAuthSnackbarMessages();
		}
	}

	public ngOnDestroy(): void {
		if (this.onErrorSubscription) {
			this.onErrorSubscription.unsubscribe();
		}
	}

	get color(): string {
		return this.authenticationError ? 'warn' : 'primary';
	}

	public updateAuthSnackbarMessages(): void {
		this.authProcess.messageOnAuthSuccess = this.messageOnAuthSuccess;
		this.authProcess.messageOnAuthError = this.messageOnAuthError;
	}

	public createForgotPasswordTab(event: Event) {
		this.passwordResetWished = true;
		setTimeout(() => (this.tabIndex = 0), 100);

		event.stopImmediatePropagation();
	}

	public processLegalSignUP() {
		this._afterSignUpMiddleware().then(() => {
			if (this.signUpFormGroup) {
				this.signUpFormGroup.reset();
			}
		});
	}

	public async signUp() {
		if (this.signUpFormGroup) {
			await this.authProcess.signUp('', {
				email: this.signUpFormGroup.value.email,
				password: this.signUpFormGroup.value.password
			});
		}
	}

	public resetPassword() {
		if (this.resetPasswordEmailFormControl) {
			this.authProcess
				.resetPassword(this.resetPasswordEmailFormControl.value)
				.then(() => (this.passReset = true));
		}
	}

	private _initSignInFormGroupBuilder() {
		this.signInFormGroup = new FormGroup({});
		this.signInFormGroup.registerControl(
			'email',
			(this.signInEmailFormControl = new FormControl('', [
				Validators.required,
				Validators.pattern(EMAIL_REGEX)
			]))
		);
		this.signInFormGroup.registerControl(
			'password',
			(this.sigInPasswordFormControl = new FormControl('', [
				Validators.required
			]))
		);
	}

	private _initSignUpFormGroupBuilder() {
		this.signUpFormGroup = new FormGroup({
			email: this.sigUpEmailFormControl = new FormControl('', [
				Validators.required,
				Validators.pattern(EMAIL_REGEX)
			]),
			password: this.sigUpPasswordFormControl = new FormControl('', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(25)
			])
		});
	}

	private _initResetPasswordFormGroupBuilder() {
		this.resetPasswordFormGroup = new FormGroup({
			email: this.resetPasswordEmailFormControl = new FormControl('', [
				Validators.required,
				Validators.pattern(EMAIL_REGEX)
			])
		});
	}

	private _afterSignUpMiddleware() {
		return this.signUp();
	}
}
