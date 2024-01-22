export interface BusinessProps {
	id: string;
	merchantId: string;
	name: string;
	address: string;
	email: string;
	billingEmail: string;
	phone: string;
	rnc: string;
	logoUrl: string;
	typeId: string;
	provinceId: string;
	referredBy: string;
	planId: string;
	stripeClientId: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}
