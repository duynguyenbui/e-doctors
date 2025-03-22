import { getPaymentSubscriptions } from '@/actions/paymentSubscriptions'
import { redirect } from 'next/navigation'
import { Pricings } from '@/components/Pricings'

export default async function Page() {
  const { success, data, message } = await getPaymentSubscriptions()

  if (success) {
    redirect(`/conversations?error=${message}`)
  }

  return (
    <div className="container mx-auto py-10">
      <Pricings />
    </div>
  )
}
