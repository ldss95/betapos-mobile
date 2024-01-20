import { useState } from 'react'

import { deleteMyAccount, updateProfile } from '@/services/users'
import { useSessionStore } from '@/store/session'
import { ApiError } from '@/types/errors'
import { UpdateProfileParams } from '@/types/user'
import { logout } from '@/services/auth'

type UseUpdateProfileType = [
	(params: UpdateProfileParams, onDone?: () => void) => void,
	boolean,
	ApiError | null
]

export const useUpdateProfile = (): UseUpdateProfileType => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ApiError | null>(null);
	const [session, setSession] = useSessionStore(({ setSession, session }) => [session, setSession]);

	async function handleUpdateProfile(params: UpdateProfileParams, onDone?: () => void) {
		try {
			setLoading(true);
			setError(null);
			const photoUrl = await updateProfile(params);
			const { photo, ...data } = params;
			setSession({
				...session!,
				...data,
				...(photoUrl && {
					photoUrl
				})
			});
			onDone && onDone();
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [handleUpdateProfile, loading, error];
}

type UseDeleteMyAccountType = [
	(onDone?: () => void) => void,
	boolean,
	ApiError | null
];

export const useDeleteMyAccount = (): UseDeleteMyAccountType => {
	const session = useSessionStore(({ session }) => session);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<ApiError | null>(null);

	async function handleDelete(onDone?: () => void) {
		try {
			setLoading(true);
			setError(null);
			await deleteMyAccount(session?.id!);
			await logout();
			onDone && onDone();
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [handleDelete, loading, error];
}
