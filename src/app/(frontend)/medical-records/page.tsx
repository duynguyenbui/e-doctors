import { getPayloadClient } from '@/get-payload'
import { getServerSideUser } from '@/get-serverside-user'
import { redirect } from 'next/navigation'
import React from 'react'
import { columns, MedicalRecordDataTableType } from './columns'
import { DataTable } from './data-table'
import { format } from 'date-fns'
export default async function Page() {
  const { user } = await getServerSideUser()
  const payload = await getPayloadClient()

  if (!user) {
    redirect('/')
  }

  const andWhereClause: any[] = []

  if (!user.roles?.includes('doctor') && !user.roles?.includes('admin')) {
    andWhereClause.push({
      'accountDetails.user.id': {
        equals: user.id,
      },
    })
  }

  const { docs: medicalRecords } = await payload.find({
    collection: 'medicalRecords',
    where: {
      and: andWhereClause,
    },
    pagination: false,
    depth: 2,
  })

  const data: MedicalRecordDataTableType[] = medicalRecords.map((medicalRecord: any) => ({
    id: medicalRecord.id,
    physicianName: medicalRecord.physician.name,
    patientName: medicalRecord.accountDetails.user.name,
    visitDate: format(new Date(medicalRecord.visitDate), 'dd/MM/yyyy'),
    symptoms: medicalRecord.symptoms,
    note: medicalRecord.note,
  }))

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-2">Lịch sử khám bệnh</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
