import { User } from '@/payload-types'
import type { CollectionAfterDeleteHook, CollectionBeforeDeleteHook } from 'payload'

export const deletePaymentSubscriptions: CollectionAfterDeleteHook<User> = async ({
  collection,
  id,
  req: { payload },
}) => {
  if (collection.slug === 'users') {
    const { docs: paymentSubscriptions } = await payload.find({
      collection: 'paymentSubscriptions',
      where: {
        or: [
          {
            'accountDetails.user.id': { equals: id },
          },
          {
            'accountDetails.user': { equals: id },
          },
        ],
      },
    })

    const paymentSubscription = paymentSubscriptions[0] ?? undefined

    if (paymentSubscription) {
      await payload.delete({
        collection: 'paymentSubscriptions',
        id: paymentSubscription.id,
      })
    }
  }
}
