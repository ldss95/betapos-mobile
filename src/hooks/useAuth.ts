import { useState } from 'react';
import { AxiosError } from 'axios';

import { login } from '@/services/auth';
import { useSessionStore } from '@/store/session';

type UseLoginType = [
    (email: string, password: string, onDone?: () => void) => void,
    boolean,
    AxiosError<{ message: string }> | null
];

export const useLogin = (): UseLoginType => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError<{ message: string }> | null>(null);
    const setSession = useSessionStore(({ setSession }) => setSession);

    async function handleLogin(email: string, password: string, onDone?: () => void) {
        try {
            setLoading(true);
            const session = await login(email, password);
            setSession(session);
            onDone && onDone();
        } catch (error) {
            setError(error as AxiosError<{ message: string }>);
        } finally {
            setLoading(false);
        }
   }

   return [handleLogin, loading, error];
}