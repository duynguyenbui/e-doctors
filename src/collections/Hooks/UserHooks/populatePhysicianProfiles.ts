import type { CollectionAfterChangeHook } from 'payload'
import type { User } from '../../../payload-types'

export const populatePhysicianProfiles: CollectionAfterChangeHook<User> = async ({
  doc,
  req: { payload },
}) => {
  if (doc.roles.includes('doctor')) {
    const { docs: physicianProfiles } = await payload.find({
      collection: 'physicianProfiles',
      where: {
        'accountDetails.user.id': { equals: doc.id },
      },
      limit: 1,
    })

    const physicianProfile = physicianProfiles[0]

    if (!physicianProfile) {
      await payload.create({
        collection: 'physicianProfiles',
        data: {
          name: `${doc.name} - ${doc.id}`,
          accountDetails: {
            user: doc.id,
            available: true,
          },
        },
      })
    }
  }
}
