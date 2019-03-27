import {
	Component,
	Inject,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	PLATFORM_ID,
	SimpleChanges
} from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import {
	MatDialog,
	MatDialogRef,
	MatFormFieldAppearance
} from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import {
	AuthProcessService,
	AuthProvider
} from '../../services/auth-process.service';
import { LegalityDialogComponent } from '../../components/legality-dialog/legality-dialog.component';
import {
	LegalityDialogParams,
	LegalityDialogResult
} from '../../interfaces/legality.dialog.intreface';
import {
	defaultAuthFirebaseUIConfig,
	NgxAuthFirebaseUIConfig
} from '../../interfaces/config.interface';
import { NgxAuthFirebaseUIConfigToken } from '../../auth-config.token';

export const EMAIL_REGEX = new RegExp(
	[
		'^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
		'|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
		'[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+',
		'[a-zA-Z]{2,}))$'
	].join('')
);

export const PHONE_NUMBER_REGEX = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);

@Component({
	selector: 'ngx-auth-firebaseui',
	templateUrl: 'auth.component.html',
	styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit, OnChanges, OnDestroy {
	@Input()
	providers: string[] | string = [AuthProvider.Google, AuthProvider.Facebook]; //  google, facebook, twitter, github as array or all as one single string

	@Input()
	appearance: MatFormFieldAppearance = 'standard';

	@Input()
	tabIndex: number | null = null;

	@Input()
	registrationEnabled = true;

	@Input()
	resetPasswordEnabled = true;

	@Input()
	guestEnabled = false;

	@Input()
	tosUrl = '';

	@Input()
	privacyPolicyUrl = '';

	@Input()
	goBackURL = '';

	@Input()
	messageOnAuthSuccess = '';

	@Input()
	messageOnAuthError = '';

	@Output()
	onSuccess: any;

	@Output()
	onError: any;

	authProvider = AuthProvider;
	passwordResetWished = false;

	public signInFormGroup: FormGroup = new FormGroup({});
	public signUpFormGroup: FormGroup = new FormGroup({});
	public resetPasswordFormGroup: FormGroup = new FormGroup({});

	onErrorSubscription: Subscription = Subscription.EMPTY;
	authenticationError = false;

	passReset = false;
	dialogRef: MatDialogRef<LegalityDialogComponent> | null = null;

	authProviders = AuthProvider;

	signInEmailFormControl: AbstractControl = new FormControl();
	sigInPasswordFormControl: AbstractControl = new FormControl();

	sigUpEmailFormControl: AbstractControl = new FormControl();
	sigUpPasswordFormControl: AbstractControl = new FormControl();
	sigUpPasswordConfirmationFormControl: AbstractControl = new FormControl();
	resetPasswordEmailFormControl: AbstractControl = new FormControl();

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		@Inject(NgxAuthFirebaseUIConfigToken)
		private config: NgxAuthFirebaseUIConfig,
		public auth: AngularFireAuth,
		public authProcess: AuthProcessService,
		public dialog: MatDialog
	) {
		this.onSuccess = authProcess.onSuccessEmitter;
		this.onError = authProcess.onErrorEmitter;
	}

	public ngOnInit(): void {
		this.config = Object.assign(defaultAuthFirebaseUIConfig, this.config);

		if (isPlatformBrowser(this.platformId)) {
			this.onErrorSubscription = this.onError.subscribe(
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

	public processLegalSignUP(authProvider: AuthProvider) {
		if (this.tosUrl || this.privacyPolicyUrl) {
			const params: LegalityDialogParams = {
				tosUrl: this.tosUrl,
				privacyPolicyUrl: this.privacyPolicyUrl,
				authProvider: authProvider
			};

			this.dialogRef = this.dialog.open(LegalityDialogComponent, {
				data: params
			});
			this.dialogRef
				.afterClosed()
				.subscribe((result: LegalityDialogResult) => {
					if (result && result.checked) {
						this._afterSignUpMiddleware().then(() => {
							if (this.signUpFormGroup) {
								this.signUpFormGroup.reset();
							}
						});
					}
					this.dialogRef = null;
				});
		} else {
			this._afterSignUpMiddleware().then(() => {
				if (this.signUpFormGroup) {
					this.signUpFormGroup.reset();
				}
			});
		}
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
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(25)
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
