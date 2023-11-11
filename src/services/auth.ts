import { SessionProps } from '@/types/auth';
import http from '@/utils/http';

export async function login(email: string, password: string) {
    const { data } = await http.post<SessionProps>('/auth/login', {
        email,
        password
    });

    return data;
}
