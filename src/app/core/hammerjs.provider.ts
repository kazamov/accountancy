import { HAMMER_LOADER } from '@angular/platform-browser';
import { ValueProvider } from '@angular/core';

export function dynamicImportHammerLoader() {
	return import('hammerjs');
}

export const HAMMERJS_PROVIDER: ValueProvider = {
	provide: HAMMER_LOADER,
	useValue: dynamicImportHammerLoader
};
