'use server'

import { getPayloadClient } from '@/get-payload'
import { getServerSideUser } from '@/get-serverside-user'
import { PayloadUserSettingsValidator, TPayloadUserSettingsValidator } from '@/validations'
import { revalidatePath } from 'next/cache'

export const updateUser = async (values: TPayloadUserSettingsValidator) => {
  const { data, error } = await PayloadUserSettingsValidator.safeParseAsync(values)

  if (!data || error) {
    return { success: false, message: error.message }
  }

  const { email, name, password, dob, gender, phone, address } = data

  const { user: currentUser } = await getServerSideUser()

  if (!currentUser) {
    return { success: false, message: 'Không có quyền truy cập' }
  }

  const payload = await getPayloadClient()

  const user = payload.findByID({
    collection: 'users',
    id: currentUser.id,
  })

  if (!user || currentUser.email !== email) {
    return { success: false, message: 'Không có quyền truy cập' }
  }

  const updatedUser = await payload.update({
    collection: 'users',
    id: currentUser.id,
    data: {
      name,
      email,
      ...(password && password.length > 0 && { password }),
      ...(dob && { dob: dob.toISOString() }),
      ...(gender && { gender }),
      ...(phone && { phone }),
      ...(address && { address }),
    },
  })

  if (updatedUser) {
    revalidatePath('/profiles')
    return { success: true, message: 'Cập nhật thông tin thành công' }
  } else {
    return { success: false, message: 'Cập nhật thông tin thất bại' }
  }
}
