'use server'

import { getPayloadClient } from '@/get-payload'
import { getServerSideUser } from '@/get-serverside-user'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Định nghĩa schema cho FormData
const FormDataSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, 'Họ tên không được để trống'),
  password: z.string().optional(),
  dob: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  avatar: z.any(), // Sẽ xử lý file hoặc "null"
})

export const updateUser = async (formData: FormData) => {
  // Chuyển FormData thành object để validate
  const values = Object.fromEntries(formData.entries())
  const { data, error } = await FormDataSchema.safeParseAsync(values)

  if (!data || error) {
    return { success: false, message: error.message }
  }

  const { email, name, password, dob, gender, phone, address } = data
  const avatar = formData.get('avatar') // Lấy file hoặc "null"

  const { user: currentUser } = await getServerSideUser()

  if (!currentUser) {
    return { success: false, message: 'Không có quyền truy cập' }
  }

  const payload = await getPayloadClient()

  const user = await payload.findByID({
    collection: 'users',
    id: currentUser.id,
    depth: 1, // Lấy dữ liệu chi tiết của avatar (media)
  })

  if (!user || currentUser.email !== email) {
    return { success: false, message: 'Không có quyền truy cập' }
  }

  try {
    let avatarId: string | undefined = undefined

    // Xử lý upload ảnh nếu có file avatar
    if (avatar && avatar !== 'null' && avatar instanceof File) {
      // Validation file
      const maxSize = 5 * 1024 * 1024 // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (avatar.size > maxSize) {
        return { success: false, message: 'Ảnh không được lớn hơn 5MB' }
      }
      if (!allowedTypes.includes(avatar.type)) {
        return { success: false, message: 'Chỉ hỗ trợ định dạng JPEG, PNG, GIF' }
      }

      // Tạo đối tượng FileData tương thích với Payload CMS
      const fileData = {
        name: avatar.name,
        size: avatar.size,
        mimetype: avatar.type, // Sử dụng type của File làm mimetype
        data: Buffer.from(await avatar.arrayBuffer()), // Thuộc tính data chứa nội dung file
      }

      // Upload file vào collection media
      const mediaResponse = await payload.create({
        collection: 'media',
        data: {
          alt: `${name}'s avatar`, // Gán alt text
          caption: undefined, // Caption không bắt buộc
        },
        file: fileData, // Sử dụng fileData với thuộc tính data
      })

      if (!mediaResponse) {
        return { success: false, message: 'Không thể upload ảnh đại diện' }
      }

      avatarId = mediaResponse.id

      // Xóa ảnh cũ nếu có
      if (user.avatar && typeof user.avatar === 'object' && user.avatar.id) {
        await payload.delete({
          collection: 'media',
          id: user.avatar.id,
        })
      }
    } else if (avatar === 'null') {
      // Nếu avatar là "null", xóa ảnh hiện tại
      if (user.avatar && typeof user.avatar === 'object' && user.avatar.id) {
        await payload.delete({
          collection: 'media',
          id: user.avatar.id,
        })
      }
      avatarId = undefined
    }

    // Cập nhật thông tin người dùng
    const updatedUser = await payload.update({
      collection: 'users',
      id: currentUser.id,
      data: {
        name,
        email,
        ...(password && password.length > 0 && { password }),
        ...(dob && { dob: new Date(dob).toISOString() }),
        ...(gender && { gender }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(avatarId !== undefined && { avatar: avatarId }),
      },
    })

    if (updatedUser) {
      revalidatePath('/profiles')
      return { success: true, message: 'Cập nhật thông tin thành công' }
    } else {
      return { success: false, message: 'Cập nhật thông tin thất bại' }
    }
  } catch (err) {
    console.error('Error updating user:', err)
    return { success: false, message: 'Có lỗi xảy ra khi cập nhật thông tin' }
  }
}