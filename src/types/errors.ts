import { AxiosError } from 'axios';

export interface ApiError extends AxiosError<{
	message?: string;
	title?: string;
	errors?: {
		message: string;
	}[]
}> {}
