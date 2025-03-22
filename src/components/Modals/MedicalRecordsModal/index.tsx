'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useModals } from '@/stores'
import { ModalType } from '@/constants'
import { useAuth } from '@/providers/AuthProvider'
import { useEffect, useState } from 'react'
import { MedicalRecord } from '@/payload-types'
import { getMedicalRecordsByUserId } from '@/actions/medicalRecords'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function MedicalRecordsModal() {
  const { user } = useAuth()
  const { isOpen, type, close, data: currentPatient } = useModals()
  const [medicalRecords, setMedicalRecords] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    if (user && user.roles.includes('doctor') && currentPatient?.id) {
      getMedicalRecordsByUserId(currentPatient.id).then((res) => {
        if (res.success) {
          toast.info(res.message)
          setMedicalRecords(res.data)
        } else {
          toast.error(res.message)
        }
      })
    }
  }, [currentPatient, user])

  if (!user || !currentPatient) {
    return null
  }

  function handleViewMedicalRecord(id: string) {
    router.push(`/medical-records/${id}`)
    toast.info('Đang chuyển hướng đến trang hồ sơ bệnh án...')
    close()
  }

  return (
    <Dialog open={isOpen && type === ModalType.MEDICAL_RECORDS} onOpenChange={close}>
      <DialogTrigger asChild />
      <DialogContent className="max-w-full p-3">
        <DialogHeader>
          <DialogTitle>Hồ sơ bệnh án của {currentPatient?.name || ''}</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Danh sách hồ sơ bệnh án của {currentPatient?.name || ''}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ngày khám</TableHead>
                <TableHead>Mã hồ sơ</TableHead>
                <TableHead>Bác sĩ</TableHead>
                <TableHead>Triệu chứng</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{formatDateTime(record.visitDate)}</TableCell>
                  <TableCell>#{record.id}</TableCell>
                  <TableCell>{record.physician.accountDetails.user.name}</TableCell>
                  <TableCell>{record.symptoms}</TableCell>
                  <TableCell>{record.note}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleViewMedicalRecord(record.id)}>
                      Xem
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
