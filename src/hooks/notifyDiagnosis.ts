import type { PayloadRequest } from 'payload'

interface DiagnosisDoc {
  id: string //
  user: string
  diagnosis: string
  diagnosisDate: string
  treatment: string
}

export const notifyDiagnosisAfterChange = async ({
  doc,
  req,
  operation,
}: {
  doc: DiagnosisDoc
  req: PayloadRequest
  operation: 'create' | 'update'
}) => {
  try {
    const { id, user, diagnosis, diagnosisDate, treatment } = doc
    console.log('[notifyDiagnosisAfterChange] Gửi thông báo...', { doc, operation })


    const diagnosisData = await req.payload.findByID({
      collection: 'diagnoses',
      id: id,
    })

    if (!diagnosisData) {
      throw new Error('Không tìm thấy chẩn đoán')
    }


    const message = `
      Chẩn đoán ${operation === 'create' ? 'mới' : 'được cập nhật'}:
       
       Ngày chẩn đoán: ${new Date(diagnosisDate).toLocaleDateString('vi-VN')}
       Kết luận: ${diagnosis}
       Điều trị: ${treatment}

    `

    console.log(' Nội dung thông báo:', message)


    await req.payload.create({
      collection: 'notifications',
      data: {
        recipient: user,
        message,
        isRead: false,
        diagnosisId: id,
      },
      req,
    })
  } catch (error) {
    console.error(' Không thể tạo thông báo:', error)
  }

  return doc
}

export const notifyDiagnosisAfterDelete = async ({
  doc,
  req,
}: {
  doc: DiagnosisDoc
  req: PayloadRequest
}) => {
  try {
    const { id, user, diagnosis, diagnosisDate, treatment } = doc


    const diagnosisData = await req.payload.findByID({
      collection: 'diagnoses',
      id: id,
    })

    if (!diagnosisData) {
      throw new Error('Không tìm thấy chẩn đoán')
    }


    const message = `
       Chẩn đoán của bạn đã bị xóa:
     
       ngày chẩn đoán: ${new Date(diagnosisDate).toLocaleDateString('vi-VN')}
       Kết luận: ${diagnosis}
       Điều trị: ${treatment}
     
    `

    console.log(' Nội dung thông báo:', message)


    await req.payload.create({
      collection: 'notifications',
      data: {
        recipient: user,
        message,
        isRead: false,
        diagnosisId: id,
      },
      req,
    })
  } catch (error) {
    console.error('Không thể tạo thông báo khi xóa:', error)
  }
}
