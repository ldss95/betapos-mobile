export interface UserProps {
	id: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	email?: string;
	nickName?: string;
	password: string;
	dui: string;
	gender: 'M' | 'F' | 'O';
	photoUrl: string;
	roleId: string;
	// role: RoleProps;
	businessId: string;
	// business: BusinessProps;
	partnerCode: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}