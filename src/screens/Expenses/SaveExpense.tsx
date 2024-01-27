import { DatePicker, Input, ScreenContainer, ScreenHeader, Select } from '@/components';
import useErrorHandling from '@/hooks/useError';
import { useFetchExpensesCategories, useFetchExpensesPaymentMethods } from '@/hooks/useExpenses';

export default function SaveExpenseScreen() {
	const [paymentMethods, loadingPM, errorPM] = useFetchExpensesPaymentMethods();
	const [categories, loadingC, errorC] = useFetchExpensesCategories();
	useErrorHandling(errorPM || errorC);

	return (
		<ScreenContainer>
			<ScreenHeader title='Nuevo Gasto' />

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

			<Select
				options={categories.map(({ id, name }) => ({ value: id, label: name }))}
				label='Categoría'
			/>
		</ScreenContainer>
	)
}
