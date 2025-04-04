import { getConversations } from '@/actions/conversation'
import { getPaymentSubscriptions } from '@/actions/paymentSubscriptions'
import { Chat } from '@/components/Chat'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{
    conversationId: string
  }>
}) {
  const { conversationId } = await params

  if (!conversationId) {
    redirect('/conversations')
  }

  const { data: conversations } = await getConversations()
console.log("data:conversations", conversations)
  if (!conversations) {
    redirect('/conversations')
  }

  const { success, data, message } = await getPaymentSubscriptions()

  if (!success) {
    redirect(`/pricings`)
  }

  return <Chat conversations={conversations} currentConversationId={conversationId} />
}
