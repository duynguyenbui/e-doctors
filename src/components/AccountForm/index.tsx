'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { PayloadUserSettingsValidator, TPayloadUserSettingsValidator } from '@/validations'
import { User } from '@/payload-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { updateUser } from '@/actions/users'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'

export function AccountForm({ user }: { user: User }) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatar && typeof user.avatar === 'object' && user.avatar.url
      ? `/media/${user.avatar.filename}`
      : null,
  )

  const form = useForm<TPayloadUserSettingsValidator>({
    resolver: zodResolver(PayloadUserSettingsValidator),
    defaultValues: {
      email: user.email,
      name: user.name,
      password: '',
      dob: user.dob ? new Date(user.dob) : undefined,
      gender: user.gender,
      phone: user.phone,
      address: user.address,
      avatar: undefined, 
    },
  })

  async function onSubmit(values: TPayloadUserSettingsValidator) {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append("name", user.name);
    if (values.password) formData.append('password', values.password)
    if (values.dob) formData.append('dob', values.dob.toISOString())
    if (values.gender) formData.append('gender', values.gender)
    if (values.phone) formData.append('phone', values.phone)
    if (values.address) formData.append('address', values.address)
    if (values.avatar instanceof File) {
      formData.append('avatar', values.avatar) 
    } else if (values.avatar === null) {
      formData.append('avatar', 'null')
    }

    const { success, message } = await updateUser(formData)
    if (success) {
      toast.success(message)
      if (values.avatar instanceof File) {
        setAvatarPreview(URL.createObjectURL(values.avatar))
      } else if (values.avatar === null) {
        setAvatarPreview(null)
      }
    } else {
      toast.error(message)
    }
  }

  return (
    <Card className="max-w-5xl lg:w-[700px]">
      <CardHeader>
        <CardTitle>Tài khoản</CardTitle>
        <CardDescription>
          Thay đổi thông tin tài khoản của bạn tại đây. Nhấn lưu khi bạn hoàn tất.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Avatar Field */}
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Ảnh đại diện</FormLabel>
                  <div className="flex items-center gap-4">
                    {/* Hiển thị ảnh hiện tại hoặc ảnh preview */}
                    {avatarPreview ? (
                      <div className="relative w-24 h-24">
                        <Image
                          src={avatarPreview}
                          alt="Avatar"
                          width={96}
                          height={96}
                          className="rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Avatar</span>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          {...field}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              onChange(file)
                              setAvatarPreview(URL.createObjectURL(file))
                            }
                          }}
                        />
                      </FormControl>
                      {avatarPreview && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onChange(null) 
                            setAvatarPreview(null)
                          }}
                        >
                          Xóa ảnh
                        </Button>
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@domain.com" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giới tính của bạn" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày sinh</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Chọn ngày sinh</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="0909090909" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="***" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Lưu thay đổi</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}