import { UserProps } from './user';

export interface ShiftProps {
	id: string;
	userId: string;
	user: UserProps;
	deviceId: string;
	startAmount: number;
	startTime: string;
	endAmount?: number;
	cashDetails: { type: number; quantity: number }[];
	endTime?: string;
	difference: number | null;
	totalSold: number;
}