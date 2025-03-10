'use client'

import { User } from '@/payload-types'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'
import { createConversation } from '@/actions/conversation'
import { toast } from 'sonner'
import { GemIcon, UserCheck2 } from 'lucide-react'

type DoctorDetailCard = Partial<User>

export default function ExpandingCard({ id, name, avatar }: DoctorDetailCard) {
  const doctorId = id
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

  if (!doctorId) {
    router.push('/conversations')
  }

  return (
    <div
      className="relative overflow-hidden h-[300px] rounded-lg shadow-md group"
      onClick={() => handleClick(doctorId!)}
    >
      <div className="relative h-full">
        <Image
          src={
            typeof avatar === 'object' && avatar?.url ? avatar.url : '/expanding-placeholder.svg'
          }
          alt={name!}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 transition-all duration-300 ease-in-out h-[100px] group-hover:h-[70%] overflow-hidden">
        <div className="p-4">
          <Badge className="rounded-full border-none bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
            Bác sĩ #{id}
            <GemIcon className="w-2 h-2" />
          </Badge>
          <h2 className="text-2xl font-bold mb-2 text-black flex items-center gap-2 hover:underline hover:text-blue-600 hover:cursor-pointer">
            {name}
            <UserCheck2 className="w-4 h-4" />
          </h2>
          <div className="transition-all duration-300 ease-in-out max-h-[40px] group-hover:max-h-[calc(100%-40px)] overflow-hidden text-black">
            <p>
              Bác sĩ có nhiều năm kinh nghiệm trong lĩnh vực y tế. Chuyên điều trị và tư vấn các vấn đề sức khỏe. 
              Luôn tận tâm với bệnh nhân và cập nhật những phương pháp điều trị tiên tiến nhất. 
              Nhấn vào để bắt đầu tư vấn trực tuyến với bác sĩ.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
