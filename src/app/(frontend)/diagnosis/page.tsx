// app/diagnosis/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/providers/AuthProvider'

interface User {
  id: string
  name: string
  email: string
  roles: string[]
  avatar?: {
    url: string
    thumbnailURL: string
  }
}

interface Conversation {
  id: string
  name: string
  participants: User[]
}

interface Diagnosis {
  id: string
  conversation: string
  user: string
  diagnosis: string
  diagnosisDate: string
  treatment: string
}

export default function DiagnosisPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [conversations, setConversations] = useState<(Conversation & { diagnosis?: Diagnosis })[]>([])
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    if (!user || !user.roles.includes('doctor')) {
      toast.error('Chỉ bác sĩ được truy cập trang này')
      router.push('/')
      return
    }

    const fetchConversations = async () => {
      try {
      
        const res = await axios.get('/api/conversations')
        const conversationsData: Conversation[] = res.data.docs 


        const filteredConversations = conversationsData.filter((conv) =>
          conv.participants.some((participant) => participant.id === user.id)
        )


        const conversationsWithDetails = await Promise.all(
          filteredConversations.map(async (conv) => {

            const diagnosisRes = await axios.get(`/api/diagnoses?where[conversation][equals]=${conv.id}`)
            const diagnosis = diagnosisRes.data.docs.length > 0 ? diagnosisRes.data.docs[0] : undefined

            return { ...conv, diagnosis }
          })
        )

        setConversations(conversationsWithDetails)
      } catch (error) {
        toast.error('Không thể lấy danh sách cuộc trò chuyện')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [user, router])


  const handleDelete = async (diagnosisId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa chuẩn đoán này?')) return

    try {
      await axios.delete(`/api/diagnoses/${diagnosisId}`)
      toast.success('Chuẩn đoán đã được xóa')

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.diagnosis && conv.diagnosis.id === diagnosisId) {
            return { ...conv, diagnosis: undefined }
          }
          return conv
        })
      )
    } catch (error) {
      toast.error('Không thể xóa chuẩn đoán')
      console.error(error)
    }
  }

  if (loading) {
    return <div className="container mx-auto p-6">Đang tải...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quản Lý Chuẩn Đoán</h1>
      {conversations.length === 0 ? (
        <p>Không có cuộc trò chuyện nào để hiển thị.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conversations.map((conv) => {
           
            const patient = conv.participants.find((p) => !p.roles.includes('doctor'))

            return (
              <Card key={conv.id} className="p-4">
                <h2 className="text-xl font-semibold">{conv.name}</h2>
                {patient ? (
                  <>
                    <p><strong>Bệnh nhân:</strong> {patient.name}</p>
                    <p><strong>Email:</strong> {patient.email}</p>
                    {patient.avatar && (
                      <img
                        src={patient.avatar.thumbnailURL}
                        alt={patient.name}
                        className="w-12 h-12 rounded-full mt-2"
                      />
                    )}
                  </>
                ) : (
                  <p><strong>Bệnh nhân:</strong> Không xác định</p>
                )}
                {conv.diagnosis ? (
                  <>
                    <p><strong>Chuẩn đoán:</strong> {conv.diagnosis.diagnosis}</p>
                    <p>
                      <strong>Ngày chuẩn đoán:</strong>{' '}
                      {conv.diagnosis.diagnosisDate
                        ? new Date(conv.diagnosis.diagnosisDate).toLocaleDateString()
                        : 'Không xác định'}
                    </p>
                    <p><strong>Phương pháp điều trị:</strong> {conv.diagnosis.treatment}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/conversations/diagnosis/${conv.id}`)}
                      >
                        Chỉnh Sửa
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(conv.diagnosis!.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => router.push(`/conversations/diagnosis/${conv.id}`)}
                  >
                    Tạo Chuẩn Đoán
                  </Button>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}