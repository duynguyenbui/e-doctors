'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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

interface DiagnosisForm {
  diagnosis: string
  diagnosisDate: string
  treatment: string
}

export default function DiagnosisDetailPage({ params }: { params: Promise<{ conversationId: string }> }) {
  const { conversationId } = React.use(params)
  const { user } = useAuth()
  const router = useRouter()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [patient, setPatient] = useState<User | null>(null)
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null)
  const [loading, setLoading] = useState(true)

  const form = useForm<DiagnosisForm>({
    defaultValues: {
      diagnosis: '',
      diagnosisDate: new Date().toISOString().split('T')[0],
      treatment: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (!user || !user.roles.includes('doctor')) {
      toast.error('Chỉ bác sĩ được truy cập trang này')
      router.push('/')
      return
    }

    const fetchData = async () => {
      try {
        const convRes = await axios.get(`/api/conversations/${conversationId}`)
        const convData: Conversation = convRes.data
        if (!convData) {
          toast.error('Không tìm thấy cuộc hội thoại')
          router.push('/diagnosis')
          return
        }
        setConversation(convData)

        const patientData = convData.participants.find((p) => !p.roles.includes('doctor'))
        if (!patientData) {
          toast.error('Không tìm thấy bệnh nhân trong cuộc hội thoại')
          router.push('/diagnosis')
          return
        }
        setPatient(patientData)

        const diagnosisRes = await axios.get(`/api/diagnoses?where[conversation][equals]=${conversationId}`)
        if (diagnosisRes.data.docs.length > 0) {
          setDiagnosis(diagnosisRes.data.docs[0])
          form.setValue('diagnosis', diagnosisRes.data.docs[0].diagnosis || '')
          form.setValue('diagnosisDate', diagnosisRes.data.docs[0].diagnosisDate || new Date().toISOString().split('T')[0])
          form.setValue('treatment', diagnosisRes.data.docs[0].treatment || '')
        }
      } catch (error) {
        toast.error('Không thể lấy thông tin')
        console.error(error)
        router.push('/diagnosis')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, router, conversationId, form])

  const onSubmit = async (values: DiagnosisForm) => {
    if (!patient || !conversation) return

    try {
      if (diagnosis) {
        const updatedDiagnosis = await axios.patch(`/api/diagnoses/${diagnosis.id}`, values)
        setDiagnosis(updatedDiagnosis.data)
        toast.success('Chuẩn đoán đã được cập nhật')
      } else {
        const newDiagnosis = await axios.post('/api/diagnoses', {
          conversation: conversationId,
          user: patient.id,
          ...values,
        })
        setDiagnosis(newDiagnosis.data)
        toast.success('Chuẩn đoán đã được tạo')
      }
      router.push('/diagnosis')
    } catch (error: any) {
      toast.error(error.message || 'Không thể lưu chuẩn đoán')
      console.error(error)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Đang tải...</div>
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Chuẩn Đoán</h1>

      <Card className="p-5 mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Thông tin bệnh nhân</h2>
        <div className="flex items-center gap-4">
          {patient?.avatar && <img src={patient.avatar.thumbnailURL} alt={patient.name} className="w-12 h-12 rounded-full" />}
          <div>
            <p><strong>Tên:</strong> {patient?.name}</p>
            <p><strong>Email:</strong> {patient?.email}</p>
          </div>
        </div>
      </Card>

      <Card className="p-5 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="diagnosis" render={({ field }) => (
              <FormItem>
                <FormLabel>Kết Luận Chuẩn Đoán</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập kết luận..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="diagnosisDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày Chuẩn Đoán</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="treatment" render={({ field }) => (
              <FormItem>
                <FormLabel>Phương Pháp Điều Trị</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập phương pháp điều trị..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" className="w-full">{diagnosis ? 'Cập Nhật' : 'Tạo'}</Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}