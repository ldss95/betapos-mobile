import { UpdateProfileParams } from '@/types/user';
import http from '@/utils/http';

export async function updateProfile(profile: UpdateProfileParams) {
	await http.put('/users', profile);
	if (!profile.photo) {
		return;
	}

	const { data } = await http.post<{ photoUrl: string; }>('/users/set-profile-image-base64', profile.photo);
	return data.photoUrl;
}
