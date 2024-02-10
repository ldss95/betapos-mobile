import { UserProps } from './user';

export interface ShiftProps {
	id: string;
	userId: string;
	user: UserProps;
	deviceId: string;
	startAmount: number;
	startTime: string;
	date: string;
	endAmount?: number;
	cashFlow: number;
	totalSoldCash: number;
	cashDetails: { type: number; quantity: number }[];
	endTime?: string;
	difference: number | null;
	totalSold: number;
}

export interface ShiftSoldDetailsProps {
	total: number;
	name: string;
};
