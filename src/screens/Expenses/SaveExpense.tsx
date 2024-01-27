import { BackButton, DatePicker, Input, ScreenContainer, Select } from '@/components';
import useErrorHandling from '@/hooks/useError';
import { useFetchExpensesPaymentMethods } from '@/hooks/useExpenses';

export default function SaveExpenseScreen() {
	const [paymentMethods, loading, error] = useFetchExpensesPaymentMethods();
	useErrorHandling(error);

	return (
		<ScreenContainer>
			<BackButton />

			<Input label='Monto' />

			<DatePicker
				label='Fecha'
			/>

			<Select
				options={[
					{ value: 'SERVICE', label: 'Servico' },
					{ value: 'PRODUCT', label: 'Producto' }
				]}
				label='Tipo'
			/>

			<Select
				options={paymentMethods.map(({ id, name }) => ({ value: id, label: name }))}
				label='Método de pago'
			/>
		</ScreenContainer>
	)
}
