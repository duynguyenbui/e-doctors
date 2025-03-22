import type { CollectionAfterDeleteHook } from 'payload'
import type { User } from '../../../payload-types'

export const deletePhysicianProfiles: CollectionAfterDeleteHook<User> = async ({
  id,
  req: { payload },
}) => {
  const { docs: physicianProfiles } = await payload.find({
    collection: 'physicianProfiles',
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

  const physicianProfile = physicianProfiles[0] ?? undefined

  if (physicianProfile) {
    await payload.delete({
      collection: 'physicianProfiles',
      id: physicianProfile.id,
    })
  }
}
