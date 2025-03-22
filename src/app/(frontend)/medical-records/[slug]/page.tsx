import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, ClipboardList, User, Stethoscope, Pill } from 'lucide-react'

import React from 'react'
import { getPayloadClient } from '@/get-payload'
import { redirect } from 'next/navigation'
import { getServerSideUser } from '@/get-serverside-user'
type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayloadClient()

  if (!slug) {
    redirect('/medical-records')
  }

  const medicalRecord: any = await payload.findByID({
    collection: 'medicalRecords',
    id: slug,
    depth: 2,
  })

  if (!medicalRecord) {
    redirect('/medical-records')
  }

  const { user } = await getServerSideUser()

  if (!user || ![medicalRecord.accountDetails.user.id, medicalRecord.physician.accountDetails.user.id].includes(user.id)) {
    redirect('/medical-records')
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: vi })
  }

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "HH:mm - dd/MM/yyyy", { locale: vi })
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Hồ Sơ Khám Bệnh</h1>

      {/* Visit Information */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <span className="font-medium">Ngày khám: {formatDateTime(medicalRecord.visitDate)}</span>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Mã hồ sơ: {medicalRecord.id.substring(medicalRecord.id.length - 8)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Patient Information */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Thông Tin Bệnh Nhân</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Họ và tên:</span>
                <span className="col-span-2 font-medium">{medicalRecord.accountDetails.user.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Ngày sinh:</span>
                <span className="col-span-2">{formatDate(medicalRecord.accountDetails.user.dob)}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Giới tính:</span>
                <span className="col-span-2">{medicalRecord.accountDetails.user.gender === "male" ? "Nam" : "Nữ"}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Số điện thoại:</span>
                <span className="col-span-2">{medicalRecord.accountDetails.user.phone}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Email:</span>
                <span className="col-span-2">{medicalRecord.accountDetails.user.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Địa chỉ:</span>
                <span className="col-span-2">{medicalRecord.accountDetails.user.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Physician Information */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Thông Tin Bác Sĩ</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Họ và tên:</span>
                <span className="col-span-2 font-medium">{medicalRecord.physician.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Học vị:</span>
                <span className="col-span-2">
                  {medicalRecord.physician.academicRank === "doctor" ? "Bác sĩ" : medicalRecord.physician.academicRank}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Chuyên khoa:</span>
                <span className="col-span-2">{medicalRecord.physician.specialty}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Kinh nghiệm:</span>
                <span className="col-span-2">{medicalRecord.physician.experience} năm</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Học vấn:</span>
                <span className="col-span-2">{medicalRecord.physician.education}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-muted-foreground">Giải thưởng:</span>
                <span className="col-span-2">{medicalRecord.physician.awards}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Details */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Chi Tiết Khám Bệnh</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Triệu chứng</h3>
              <p className="p-3 bg-muted rounded-md">{medicalRecord.symptoms}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Chẩn đoán</h3>
              <p className="p-3 bg-muted rounded-md">{medicalRecord.diagnosis}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Phương pháp điều trị</h3>
              <p className="p-3 bg-muted rounded-md">{medicalRecord.treatment}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Ghi chú</h3>
              <p className="p-3 bg-muted rounded-md">{medicalRecord.note}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Đơn Thuốc</CardTitle>
          </div>
          <CardDescription>Danh sách thuốc được kê đơn</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Tên thuốc</TableHead>
                <TableHead>Liều lượng</TableHead>
                <TableHead>Hướng dẫn sử dụng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalRecord.prescriptions.map((prescription: any, index: number) => (
                <TableRow key={prescription.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{prescription.medication}</TableCell>
                  <TableCell>{prescription.dosage}</TableCell>
                  <TableCell>{prescription.instructions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Footer with timestamps */}
      <div className="mt-8 text-sm text-muted-foreground text-center">
        <p>Hồ sơ được tạo: {formatDateTime(medicalRecord.createdAt)}</p>
        <p>Cập nhật lần cuối: {formatDateTime(medicalRecord.updatedAt)}</p>
      </div>
    </div>
  )
}
