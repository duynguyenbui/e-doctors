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

export function MedicalRecordsModal() {
  const { user } = useAuth()
  const { isOpen, type, close, data } = useModals()

  if(!user) {
    return null
  }

  return (
    <Dialog open={isOpen && type === ModalType.MEDICAL_RECORDS} onOpenChange={close}>
      <DialogTrigger asChild />
      <DialogContent className="max-w-5xl p-6">
          <DialogHeader>
            <DialogTitle>Hồ sơ bệnh án của {data?.name}</DialogTitle>
          </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
