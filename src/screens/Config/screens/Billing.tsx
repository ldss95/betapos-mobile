import { RenderIf, ScreenContainer, ScreenHeader } from '@/components';
import PendingInvoiceCard from '../components/PendingInvoiceCard';
import Receipt from '../components/Receipt';
import { useFetchAllBills } from '@/hooks/useBilling';
import useErrorHandling from '@/hooks/useError';

export default function BillingScreen() {
	const [bills, loading, error] = useFetchAllBills();
	useErrorHandling(error);

	return (
		<ScreenContainer>
			<ScreenHeader title='Tus Facturas' />

			<RenderIf condition={loading && bills.length === 0}>
				<PendingInvoiceCard
					amount={0}
					date=''
					invoiceNumber=''
					paymentLink=''
					invoiceUrl=''
					loading
				/>

				<Receipt
					amount={0}
					date=''
					receiptUrl=''
					invoiceNumber=''
					loading
				/>
			</RenderIf>

			<>
				{bills
					.filter(({ payed }) => !payed)
					.map(({ id, amount, createdAt, stripePayUrl, orderNumber, invoicePdfUrl }) => (
						<PendingInvoiceCard
							key={id}
							amount={amount}
							date={createdAt}
							invoiceNumber={orderNumber}
							paymentLink={stripePayUrl!}
							invoiceUrl={invoicePdfUrl!}
							loading={loading}
						/>
					))
				}
			</>

			<>
				{bills
					.filter(({ payed }) => payed)
					.map(({ id, amount, createdAt, transferVoucherUrl, receiptPdfUrl, orderNumber }) => (
						<Receipt
							key={id}
							amount={amount}
							date={createdAt}
							receiptUrl={receiptPdfUrl || transferVoucherUrl}
							invoiceNumber={orderNumber}
							loading={loading}
						/>
					))
				}
			</>
		</ScreenContainer>
	)
}
