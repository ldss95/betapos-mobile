export interface SessionProps {
	firstName: string;
	lastName: string;
	email: string;
	roleId: string;
	id: string;
	businessId: string;
	photoUrl: string | null;
	roleCode: RoleCode;
	merchantId: string;
	expireSoon?: boolean;
}

export type RoleCode = 'ADMIN' | 'BIOWNER' | 'SELLER' | 'PARTNER' | 'SUPPORT';
