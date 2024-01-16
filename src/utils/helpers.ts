import 'intl';
import 'intl/locale-data/jsonp/es-DO';
import { Subject } from 'rxjs';
import { WebBrowserPresentationStyle } from 'expo-web-browser';

export const Unauthorized$ = new Subject();

export const format = {
	cash: (amount: number, decimals: 0 | 1 | 2 = 0) => {
		return Intl.NumberFormat('es-DO', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		}).format(amount)
	}
}

export const WebBrowserOptions = {
	presentationStyle: WebBrowserPresentationStyle.POPOVER
};

export function extractTitleAndDescriptionFromErrorMessage(message: string) {
	try {
		return JSON.parse(message);
	} catch (error) {
		return ['Error desconocido', message];
	}
}
