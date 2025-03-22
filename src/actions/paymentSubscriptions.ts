'use server'

import { getPayloadClient } from '@/get-payload'
import { getServerSideUser } from '@/get-serverside-user'

export const getPaymentSubscriptions = async () => {
  const payload = await getPayloadClient()
  const { user } = await getServerSideUser()

  if (!user) {
    return {
      success: false,
      message: 'Bạn cần đăng nhập để xem các gói dịch vụ của bạn',
    }
  }

  if (user.roles.includes('doctor') || user.roles.includes('admin')) {
    return {
      success: true,
      message: 'Bạn không phải là người dùng thường để xem các gói dịch vụ',
      data: undefined,
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

  if (!subscription) {
    return {
      success: false,
      message: 'Bạn không có gói dịch vụ',
      data: undefined
    }
  }

  return {
    success: true,
    message: 'Lấy danh sách gói dịch vụ thành công',
    data: subscription,
  }
}
