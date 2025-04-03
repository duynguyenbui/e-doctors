import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getPayloadClient } from '@/get-payload'
import { Heart, Mail, Phone, MapPin, Calendar, GraduationCap, Award, Clock } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const params = await paramsPromise
  const slug = params.slug

  const payload = await getPayloadClient()
  const { docs: doctors } = await payload.find({
    collection: 'physicianProfiles',
    where: {
      'accountDetails.user.id': {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
    pagination: false,
  })

  const doctor: any = doctors[0]

  if (!doctor) {
    redirect('/conversations')
  }

  const birthDate = new Date(doctor.accountDetails.user.dob)
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card className="h-fit">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2 justify-center">
              <Avatar>
                <AvatarImage src={(doctor.accountDetails.user.avatar as any)?.url} alt="@shadcn" />
                <AvatarFallback>ED</AvatarFallback>
              </Avatar>
              {doctor.accountDetails.user.name}
            </CardTitle>
            <CardDescription className="flex justify-center items-center gap-1">
              <Heart className="h-4 w-4 text-primary" />
              {doctor.specialty}
            </CardDescription>
            <Badge variant="outline" className="mt-2 capitalize">
              {doctor.academicRank}
            </Badge>
            {doctor.accountDetails.available && (
              <Badge className="mt-2 bg-green-500 hover:bg-green-600">Đang làm việc</Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Thông tin liên hệ</h3>
              <Separator />
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{doctor.accountDetails.user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{doctor.accountDetails.user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{doctor.accountDetails.user.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {age} tuổi ({doctor.accountDetails.user.gender === 'female' ? 'Nữ' : 'Nam'})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Học vấn và Kinh nghiệm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Học vấn</h3>
                <p className="text-muted-foreground">{doctor.education}</p>
              </div>
              <div>
                <h3 className="font-medium">Kinh nghiệm</h3>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">{doctor.experience} năm kinh nghiệm</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Chuyên khoa</h3>
                <p className="text-muted-foreground">{doctor.specialty}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Giải thưởng và Thành tựu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{doctor.awards}</p>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Thông tin ID</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-[120px_1fr] gap-1">
                <span className="text-sm font-medium text-muted-foreground">ID Bác sĩ:</span>
                <span className="text-sm">{doctor.id}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-1">
                <span className="text-sm font-medium text-muted-foreground">ID Người dùng:</span>
                <span className="text-sm">{doctor.accountDetails.user.id}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-1">
                <span className="text-sm font-medium text-muted-foreground">Vai trò:</span>
                <div className="flex gap-1">
                  {doctor.accountDetails.user.roles.map((role: any) => (
                    <Badge key={role} variant="outline" className="capitalize">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  )
}
