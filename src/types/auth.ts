import { BusinessProps } from "./business";

export interface SessionProps {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	nickName?: string;
	gender: 'F' | 'M' | 'O';
	birthDate: string;
	roleId: string;
	businessId: string;
	business: BusinessProps;
	photoUrl: string | null;
	roleCode: RoleCode;
	merchantId: string;
	expireSoon?: boolean;
}

export type RoleCode = 'ADMIN' | 'BIOWNER' | 'SELLER' | 'PARTNER' | 'SUPPORT';

export enum BiometricAuthTokenType {
	FaceId = 'FACE_ID',
	TouchId = 'TOUCH_ID',
	Fingerprint = 'FINGERPRINT',
	FaceUnlock = 'FACE_UNLOCK'
}

export interface CodeValidationResponse {
	isValid: boolean;
	expired: boolean;
}
