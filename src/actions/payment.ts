'use server'

import { getPayloadClient } from "@/get-payload"
import { getServerSideUser } from "@/get-serverside-user"
import { stripe } from '@/stripe'
import { redirect } from "next/navigation"
import Stripe from 'stripe'

export const createPayment = async () => {
  const payload = await getPayloadClient()

  const { user } = await getServerSideUser()

  if (!user || user.roles.includes('doctor') || user.roles.includes('admin')) {
    return {
      success: false,
      message: 'Bạn không có quyền thực hiện giao dịch',
    }
  }

  const currentDate = new Date()

  const { docs: paymentSubscriptions } = await payload.find({
    collection: 'paymentSubscriptions',
    where: {
      and: [
        {
          'accountDetails.user.id': {
            equals: user.id,
          },
        },
      ],
    },
    pagination: false,
    depth: 1,
  })
  const paymentSubscription = paymentSubscriptions[0]

  const subscription = paymentSubscription.subscription?.find((subscription) => {
    if (!subscription.startDate || !subscription.endDate) {
      return false
    }

    const startDate = new Date(subscription.startDate)
    const endDate = new Date(subscription.endDate)

    return startDate <= currentDate && endDate >= currentDate
  })

  if(subscription) {
    return {
      success: false,
      message: 'Bạn đã có gói dịch vụ',
    }
  }

  const amountPerMonth = process.env.NEXT_PUBLIC_AMOUNT_PER_MONTH

  let session: Stripe.Response<Stripe.Checkout.Session> | undefined = undefined
  const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  stripeLineItems.push({
    price_data: {
      currency: 'vnd',
      product_data: {
        name: 'Gói dịch vụ 1 tháng',
        description: 'Gói dịch vụ 1 tháng của bạn, cho phép bạn chat với bác sĩ thoải mái trong 1 tháng với số lượng không giới hạn',
      },
      unit_amount: Number(amountPerMonth),
    },
    quantity: 1,
  })

  session = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/success?userId=${user.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/cancel?userId=${user.id}`,
    metadata: {
      userId: user.id,
    },
  })

  if (session?.url) {
    redirect(session.url)
  } else {
    return { success: false, message: 'Lỗi khi tạo session thanh toán', data: null }
  }
}