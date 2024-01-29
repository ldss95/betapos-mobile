import useErrorHandling from '@/hooks/useError';
import { useFetchProviders } from '@/hooks/useProviders';
import { Button, DatePicker, Input, ScreenContainer, ScreenHeader, Select } from '@/components';
import { useFetchExpensesCategories, useFetchExpensesPaymentMethods } from '@/hooks/useExpenses';
import AttachDocument from './components/AttachDocument';

export default function SaveExpenseScreen() {
	const [paymentMethods, loadingPM, errorPM] = useFetchExpensesPaymentMethods();
	const [categories, loadingC, errorC] = useFetchExpensesCategories();
	const [providers, loadingP, errorP] = useFetchProviders();
	useErrorHandling(
		errorPM ||
		errorC ||
		errorP
	);

	return (
		<ScreenContainer>
			<ScreenHeader title='Nuevo Gasto' />

			<Input
				label='Nombre / Descripción'
			/>

			<Input
				label='Monto'
				keyboardType='decimal-pad'
			/>

			<Input
				label='ITBIS'
				keyboardType='decimal-pad'
			/>

			<Input
				label='Comprobande Fiscal (NCF)'
				keyboardType='decimal-pad'
			/>

			<Input
				label='Número de Factura'
				keyboardType='decimal-pad'
			/>

			<DatePicker
				label='Fecha'
			/>

			<Select
				options={[
					{ value: 'SERVICE', label: 'Servico' },
					{ value: 'PRODUCT', label: 'Producto' }
				]}
				label='Tipo'
				height='25%'
			/>

			<Select
				options={paymentMethods.map(({ id, name }) => ({ value: id, label: name }))}
				label='Método de pago'
			/>

			<Select
				options={categories.map(({ id, name }) => ({ value: id, label: name }))}
				label='Categoría'
			/>

			<Select
				options={providers.map(({ id, name }) => ({ value: id, label: name }))}
				label='Proveedor'
				height='75%'
			/>

			<AttachDocument />

			<Button type='primary'>
				Guardar
			</Button>
		</ScreenContainer>
	)
}
