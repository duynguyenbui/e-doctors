import type { CollectionAfterChangeHook } from 'payload'
import type { User } from '../../../payload-types'

export const populatePaymentSubscriptions: CollectionAfterChangeHook<User> = async ({
  doc,
  req: { payload },
}) => {
  if (!doc.roles.includes('doctor') && !doc.roles.includes('admin')) {
    const { docs: paymentSubscriptions } = await payload.find({
      collection: 'paymentSubscriptions',
      where: {
        'accountDetails.user.id': { equals: doc.id },
      },
      limit: 1,
    })
  
    const paymentSubscription = paymentSubscriptions[0]
  
    if (!paymentSubscription) {
      await payload.create({
        collection: 'paymentSubscriptions',
        data: {
          name: `${doc.name} - ${doc.id}`,
          accountDetails: {
            user: doc.id,
          },
        },
      })
    }
  }
}
