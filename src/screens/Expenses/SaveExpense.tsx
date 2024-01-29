import { useState } from 'react';
import { z } from 'zod';

import useErrorHandling from '@/hooks/useError';
import { useFetchProviders } from '@/hooks/useProviders';
import {
	Button,
	DatePicker,
	Input,
	ScreenContainer,
	ScreenHeader,
	Select
} from '@/components';
import {
	useFetchExpensesCategories,
	useFetchExpensesPaymentMethods,
	useSaveExpense
} from '@/hooks/useExpenses';
import AttachDocument from './components/AttachDocument';
import { showAlert } from '@/components/Alert';
import { RootStackScreenProps } from '@/types/routes';
import { format } from '@/utils/helpers';
import { SaveExpenseParams } from '@/types/expense';

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

	const [data, setData] = useState<SaveExpenseParams>({});

	async function handleSave() {
		const schema = z.object({
			description: z.string({ required_error: 'Olvidaste agregar una descripción.' }),
			amount: z.preprocess(
				(val) => Number(`${val}`.replace(/\D/g, '')),
				z.number().min(1, 'Olvidaste agregar el monto de la factura.')
			),
			itbis: z.preprocess(
				(val) => val && Number(`${val}`.replace(/\D/g, '')),
				z.number({ required_error: 'Olvidaste agregar el ITBIS de la factura, puede ser 0.' }).min(0, )
			),
			date: z.string({ required_error: 'Olvidaste seleccioinar la fecha de la factura.' }),
			paymentMethodId: z.string({ required_error: 'Olvidaste seleccionar el método de pago de de la factura.' }),
			type: z.string({ required_error: 'Olvidaste seleccionar el tipo de factura.' }),
			ncf: z.string().length(13, 'Comprobante Invalido').optional().nullable()
		});

		const res = schema.safeParse(data)
		if (!res.success) {
			const [{ message }] = res.error.issues;
			return showAlert({
				title: message,
				type: 'warning',
				description: ''
			});
		}

		save(
			{
				...data,
				amount: +`${data?.amount || ''}`.replace(/,/g, ''),
				itbis: +`${data?.itbis || ''}`.replace(/,/g, '')
			},
			() => {
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

	function handleAmountChange(key: string, value: string) {
		const decimal = Number(value.replace(/\D/g, '')) / 100;
		setData({
			...data,
			[key]: format.cash(decimal, 2)
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
				value={`${data?.amount ?? ''}`}
				keyboardType='decimal-pad'
				onChangeText={(amount) => handleAmountChange('amount', amount)}
				required
			/>

			<Input
				label='ITBIS'
				keyboardType='decimal-pad'
				value={`${data?.itbis ?? ''}`}
				onChangeText={(itbis) => handleAmountChange('itbis', itbis)}
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
