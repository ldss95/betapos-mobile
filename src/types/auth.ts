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
	photoUrl: string | null;
	roleCode: RoleCode;
	merchantId: string;
	expireSoon?: boolean;
}

export type RoleCode = 'ADMIN' | 'BIOWNER' | 'SELLER' | 'PARTNER' | 'SUPPORT';
