import { fetchPurchasesPendingToPayAmount } from "@/services/purchases";
import { ApiError } from "@/types/errors";
import { useEffect, useState } from "react";

type UseFetchPurchasesPendingToPayAmountType = [
	number,
	boolean,
	ApiError | null,
	(showLoading?: boolean) => void
];

export const useFetchPurchasesPendingToPayAmount = (): UseFetchPurchasesPendingToPayAmountType => {
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		load();
	}, []);

	async function load(showLoading = true) {
		try {
			if (showLoading) {
				setLoading(true);
			}
			setError(null);
			const { amount } = await fetchPurchasesPendingToPayAmount();
			setAmount(amount);
		} catch (error) {
			setError(error as ApiError);
		} finally {
			setLoading(false);
		}
	}

	return [amount, loading, error, load];
}
