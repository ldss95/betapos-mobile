import { useState } from 'react';
import { DocumentPickerAsset } from 'expo-document-picker';
import { ImagePickerAsset } from 'expo-image-picker';

import useErrorHandling from '@/hooks/useError';
import { useFetchProviders } from '@/hooks/useProviders';
import { Button, DatePicker, Input, ScreenContainer, ScreenHeader, Select } from '@/components';
import { useFetchExpensesCategories, useFetchExpensesPaymentMethods, useSaveExpense } from '@/hooks/useExpenses';
import AttachDocument from './components/AttachDocument';
import { ExpenseProps } from '@/types/expense';
import { showAlert } from '@/components/Alert';
import { RootStackScreenProps } from '@/types/routes';

interface DataProps extends ExpenseProps {
	photo?: ImagePickerAsset | null;
	document?: DocumentPickerAsset | null;
}

export default function SaveExpenseScreen({ navigation }: RootStackScreenProps<'SaveExpense'>) {
	const [paymentMethods, loadingPM, errorPM] = useFetchExpensesPaymentMethods();
	const [categories, loadingC, errorC] = useFetchExpensesCategories();
	const [providers, loadingP, errorP] = useFetchProviders();
	const [save, saving, error] = useSaveExpense();
	useErrorHandling(
		errorPM ||
		errorC ||
		errorP ||
		error
	);

	const [data, setData] = useState<DataProps>({} as DataProps);

	async function handleSave() {
		if (!data.description || data.description.replace(/ /g, '') === '') {
			return showAlert({
				title: 'Falta Nombre / Descriopcion',
				type: 'warning',
				description: ''
			});
		}

		if (!data.amount) {
			return showAlert({
				title: 'Falta Monto',
				type: 'warning',
				description: ''
			});
		}

		if (!data.date) {
			return showAlert({
				title: 'Falta Fecha',
				type: 'warning',
				description: ''
			});
		}

		if (!data.paymentMethodId) {
			return showAlert({
				title: 'Falta Método de pago',
				type: 'warning',
				description: ''
			});
		}

		if (!data.type) {
			return showAlert({
				title: 'Falta Tipo',
				type: 'warning',
				description: ''
			});
		}

		if (data.itbis === undefined) {
			return showAlert({
				title: 'Falta ITBIS',
				type: 'warning',
				description: ''
			});
		}

		save(data, () => {
			showAlert({
				title: 'Listo!',
				type: 'success',
				description: 'Tu factura / gasto ha sido guardado con exito'
			});

			navigation.reset({
				index: 0,
				routes: [{
					name: 'Root',
					params: {
						screen: 'Expenses'
					}
				}]
			});
		});
	}

	return (
		<ScreenContainer>
			<ScreenHeader title='Nuevo Gasto' />

			<Input
				label='Nombre / Descripción'
				onChangeText={(description) => setData({ ...data, description })}
				required
			/>

			<Input
				label='Monto'
				keyboardType='decimal-pad'
				onChangeText={(amount) => setData({ ...data, amount: Number(amount) || 0 })}
				required
			/>

			<Input
				label='ITBIS'
				keyboardType='decimal-pad'
				onChangeText={(itbis) => setData({ ...data, itbis: Number(itbis) })}
				required
			/>

			<Input
				label='Comprobande Fiscal (NCF)'
				onChangeText={(ncf) => setData({ ...data, ncf })}
			/>

			<Input
				label='Número de Factura'
				onChangeText={(docNumber) => setData({ ...data, docNumber })}
			/>

			<DatePicker
				label='Fecha'
				onChange={(date) => setData({ ...data, date: date! })}
				value={data.date}
				required
			/>

			<Select
				options={[
					{ value: 'SERVICES', label: 'Servico' },
					{ value: 'PRODUCTS', label: 'Producto' }
				]}
				label='Tipo'
				height='25%'
				onDone={([type]) => setData({ ...data, type: type as ('SERVICES' | 'PRODUCTS')})}
				required
			/>

			<Select
				options={paymentMethods.map(({ id, name }) => ({ value: id, label: name }))}
				label='Método de pago'
				onDone={([paymentMethodId]) => setData({ ...data, paymentMethodId: paymentMethodId as string })}
				required
			/>

			<Select
				options={categories.map(({ id, name }) => ({ value: id, label: name }))}
				onDone={([categoryId]) => setData({ ...data, categoryId: categoryId as string })}
				label='Categoría'
			/>

			<Select
				options={providers.map(({ id, name }) => ({ value: id, label: name }))}
				label='Proveedor'
				onDone={([providerId]) => setData({ ...data, providerId: providerId as string })}
				height='75%'
			/>

			<AttachDocument onChange={({ photo, document }) => setData({ ...data, photo, document })} />

			<Button
				type='primary'
				onPress={handleSave}
				loading={saving}
			>
				Guardar
			</Button>
		</ScreenContainer>
	)
}
