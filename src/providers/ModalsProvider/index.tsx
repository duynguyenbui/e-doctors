'use client'

import React, { useEffect, useState } from 'react'
import { ImageDialog } from '@/components/Modals/ImageModal'
import { MedicalRecordNewModal } from '@/components/Modals/MedicalRecordNewModal'
import { MedicalRecordsModal } from '@/components/Modals/MedicalRecordsModal'

export default function ModalsProvider() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <React.Fragment>
      <ImageDialog />
      <MedicalRecordNewModal />
      <MedicalRecordsModal />
    </React.Fragment>
  )
}
