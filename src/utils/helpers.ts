import 'intl';
import 'intl/locale-data/jsonp/es-DO';
import { Subject } from 'rxjs';

export const Unauthorized$ = new Subject();

export default {
	cash: (amount: number, decimals: 0 | 1 | 2 = 0) => {
		return Intl.NumberFormat('es-DO', { minimumFractionDigits: decimals }).format(amount)
	}
}