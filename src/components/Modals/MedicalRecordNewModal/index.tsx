'use client'

import Image from 'next/image'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useModals } from '@/stores'
import { ModalType } from '@/constants'
import { useAuth } from '@/providers/AuthProvider'
import { MedicalRecordForm } from '@/components/Forms/MedicalRecordNewForm'
import { toast } from 'sonner'
import { TPayloadMedicalRecordValidator, PayloadMedicalRecordValidator } from '@/validations'
import { createMedicalRecord } from '@/actions/medicalRecords'

export function MedicalRecordNewModal() {
  const { user } = useAuth()
  const { isOpen, type, close, data: currentPatient } = useModals()

  if (!user || !currentPatient) {
    return null
  }

  const handleSubmit = async (values: TPayloadMedicalRecordValidator) => {
    const { success, error } = PayloadMedicalRecordValidator.safeParse(values)

    if (!success) {
      return { success: false, data: null, message: error.message }
    }

    createMedicalRecord(values)
      .then((res) => {
        if (res.success) {
          toast.success(res.message)
          close()
        } else {
          toast.error(res.message)
        }
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <Dialog open={isOpen && type === ModalType.MEDICAL_RECORD_NEW} onOpenChange={close}>
      <DialogTrigger asChild />
      <DialogContent className="max-w-5xl p-6">
        <DialogHeader>
          <DialogTitle>Tạo hồ sơ khám bệnh</DialogTitle>
          <DialogDescription>Điền đầy đủ thông tin để tạo hồ sơ khám bệnh mới</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <MedicalRecordForm
            onSubmit={handleSubmit}
            doctorId={user.id}
            patientId={currentPatient.id}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
