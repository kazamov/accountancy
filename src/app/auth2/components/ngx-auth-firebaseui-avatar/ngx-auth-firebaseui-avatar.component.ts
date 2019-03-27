import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';

import { UserComponent } from '../../components/ngx-auth-firebaseui-user/user.component';

export interface LinkMenuItem {
	text: string;
	icon?: string;
	callback?: Function;
}

@Component({
	selector: 'ngx-auth-firebaseui-avatar',
	templateUrl: './ngx-auth-firebaseui-avatar.component.html',
	styleUrls: ['./ngx-auth-firebaseui-avatar.component.scss']
})
export class NgxAuthFirebaseuiAvatarComponent implements OnInit {
	@Input()
	canLogout = true;

	@Input()
	links: LinkMenuItem[] = [];

	@Output()
	onSignOut: EventEmitter<void> = new EventEmitter();

	user: User | null = null;
	user$: Observable<User | null> = of();
	displayNameInitials: string | null = null;

	constructor(public afa: AngularFireAuth, public dialog: MatDialog) {}

	ngOnInit() {
		this.user$ = this.afa.user;
		this.user$.subscribe(user => {
			if (user) {
				this.user = user;
				this.displayNameInitials = this.getDisplayNameInitials(
					user.displayName
				);
			}
		});
	}

	getDisplayNameInitials(displayName: string | null) {
		if (!displayName) {
			return null;
		}
		const initialsRegExp: RegExpMatchArray =
			displayName.match(/\b\w/g) || [];
		const initials = (
			(initialsRegExp.shift() || '') + (initialsRegExp.pop() || '')
		).toUpperCase();
		console.log(initials);
		return initials;
	}

	openProfile() {
		this.dialog.open(UserComponent);
	}

	async signOut() {
		try {
			await this.afa.auth.signOut();
			// Sign-out successful.
			this.onSignOut.emit();
		} catch (e) {
			// An error happened.
			console.error('An error happened while signing out!', e);
		}
	}
}
