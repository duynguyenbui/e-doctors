import type { CollectionAfterChangeHook } from 'payload'
import type { User } from '../../payload-types'

/**
{
  createdAt: '2025-03-22T06:59:30.633Z',
  updatedAt: '2025-03-22T06:59:30.633Z',
  name: 'Test',
  dob: '2025-03-05T12:00:00.000Z',
  gender: 'male',
  phone: '0944755822',
  address: 'Test',
  roles: [ 'doctor', 'user' ],
  email: 'test@edoctors.com',
  id: '67de5fd29b4ae8c9706b6904',
  loginAttempts: 0
}
*/

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
