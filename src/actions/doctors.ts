'use server'

import { getPayloadClient } from '@/get-payload'

export const getDoctorsWithProfiles = async () => {
  const payloadClient = await getPayloadClient()


  const { docs: doctors } = await payloadClient.find({
    collection: 'users',
    where: {
      'roles': {
        contains: 'doctor',
      },
    },
    pagination: false,
    depth: 1,
  })


  const { docs: profiles } = await payloadClient.find({
    collection: 'physicianProfiles',
    pagination: false,
    depth: 1,
  })


  const doctorsWithProfiles = doctors.map(doctor => {

    const profile = profiles.find(p => (p.accountDetails.user as any)?.id === doctor.id)
   
    return {
      ...doctor,
      profile: profile || null,
    }
  })
  return doctorsWithProfiles
 
}

export const getDoctorProfile = async (doctorId: string) => {
  const payloadClient = await getPayloadClient()

 
  const { docs: profiles } = await payloadClient.find({
    collection: 'physicianProfiles',
    where: {
      'accountDetails.user': {
        equals: doctorId,
      },
    },
    pagination: false,
    depth: 1,
  })

  return profiles.length > 0 ? profiles[0] : null
}
