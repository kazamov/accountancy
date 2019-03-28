import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';

export interface LinkMenuItem {
	text: string;
	icon?: string;
	callback?: Function;
}

@Component({
	selector: 'app-auth-firebaseui-avatar',
	templateUrl: './auth-firebaseui-avatar.component.html',
	styleUrls: ['./auth-firebaseui-avatar.component.scss']
})
export class AuthFirebaseuiAvatarComponent implements OnInit {
	@Input()
	canLogout = true;

	@Input()
	links: LinkMenuItem[] = [];

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
		// this.dialog.open(UserComponent);
	}

	async signOut() {
		try {
			await this.afa.auth.signOut();
		} catch (e) {
			// An error happened.
			console.error('An error happened while signing out!', e);
		}
	}
}
