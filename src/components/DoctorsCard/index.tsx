'use client'

import { createConversation } from '@/actions/conversation'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { User } from '@/payload-types'
import { ArrowRight, MousePointerClickIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '../ui/button'

type DoctorCardProps = User & {
  updatedAt?: string 
  profile?: {
    education?: string
    experience?: number
    specialty?: string
    awards?: string
    
  }
}

export default function DoctorCard({ id, name, avatar, email, profile }: DoctorCardProps) {
  const router = useRouter()

  const handleClick = async (doctorId: string) => {
    const { success, data, message } = await createConversation(doctorId)

    if (data) {
      if (success) {
        toast.success(message)
      }

      router.push(`/conversations/chat/${data.id}`)
    } else {
      toast.error(message)
    }
  }

  if (!id) {
    router.push('/conversations')
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={(avatar as any)?.url ?? '/doctor-card-placeholder.svg'}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105 -mt-6"
        />
      </div>
      <CardContent className="px-4 py-2 -mt-6">
        <Button
          className="text-xl font-bold mb-2 cursor-pointer bg-blue-600  "
          variant="default"
          onClick={() => handleClick(id)}
        >
          {name}
          <MousePointerClickIcon className="w-4 h-4 ml-2" />
        </Button>
        <div className="flex flex-wrap gap-2 flex-col">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
              {email}
            </span>
          </div>

          {/* Hiển thị Profile nếu có */}
          {profile && (
            <div className="mt-2">
              {profile.specialty && (
                <p className="text-sm text-gray-700">
                  <strong>Chuyên khoa:</strong> {profile.specialty}
                </p>
              )}
              {profile.education && (
                <p className="text-sm text-gray-700">
                  <strong>Học vấn:</strong> {profile.education}
                </p>
              )}
              {profile.experience !== undefined && (
                <p className="text-sm text-gray-700">
                  <strong>Kinh nghiệm:</strong> {profile.experience} năm
                </p>
              )}
              {profile.awards && (
                <p className="text-sm text-gray-700">
                  <strong>Thành tựu:</strong> {profile.awards}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link
          href={`/doctors/${id}`}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm hover:underline"
        >
          <ArrowRight className="h-4 w-4" />
          Xem thêm về bác sĩ
        </Link>
      </CardFooter>
    </Card>
  )
}
