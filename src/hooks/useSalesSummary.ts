import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { useSessionStore } from '@/store/session';

const socket = io(process.env.EXPO_PUBLIC_API_URL!, {
	autoConnect: false,
	transports: ['websocket']
});

interface SummaryProps {
    creditsAmount: number;
    profitsAmount: number;
    salesAmount: number;
    salesQty: number;
	percentDiff: number;
}

type UseSalesSummaryType = [
    SummaryProps | null,
    boolean,
    Error | null
];

export const useSalesSummary = (): UseSalesSummaryType => {
	const session = useSessionStore(({ session }) => session);
    const [loading, setLoading] = useState(true);
	const [data, setData] = useState<SummaryProps | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!session) {
			return;
		}

		socket.on('connect', () => socket.emit('listen-today-sales-summary', session.businessId));
		socket.on('today-sales-summary', (data) => {
			setData(data);
			setLoading(false);
		});
		socket.on('error', setError);
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, [session]);

    return [data, loading, error];
}
