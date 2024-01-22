import { UpdateBusinessParams } from '@/types/business';
import http from '@/utils/http';

export async function updateBusiness(params: UpdateBusinessParams) {
	await http.put('/business', params);

	if (params.logo) {
		await http.post('/business/set-logo-image-base64', {
			...params.logo
		});
	}
}
