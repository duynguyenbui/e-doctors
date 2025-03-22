'use server'

import { getPayloadClient } from '@/get-payload'
import { getServerSideUser } from '@/get-serverside-user'

export const getConversationsByDoctorId = async (doctorId: string) => {
  if (!doctorId) {
    return {
      success: false,
      message: 'Mã bác sĩ là bắt buộc',
      data: [],
    }
  }

  const { user } = await getServerSideUser()

  if (!user || !user.roles.includes('doctor')) {
    return {
      success: false,
      message: 'Bạn không có quyền truy cập trang này',
      data: [],
    }
  }

  const payloadClient = await getPayloadClient()

  const { docs: conversations } = await payloadClient.find({
    collection: 'conversations',
    where: {
      participants: {
        contains: doctorId,
      },
    },
    depth: 0
  })

  if (!conversations) {
    return {
      success: false,
      message: 'Không tìm thấy cuộc hội thoại',
      data: [],
    }
  }

  return {
    success: true,
    message: 'Tìm thấy cuộc hội thoại',
    data: conversations,
  }
}
