"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PayloadUserSignUpValidator, type TPayloadUserSignUpValidator } from "@/validations"
import { useAuth } from "@/providers/AuthProvider"
import { useCallback, useState } from "react"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { useRouter } from "next/navigation"

export function RegisterForm({ className }: { className?: string }) {
  const { create } = useAuth()
  const router = useRouter()
  const [birthDate, setBirthDate] = useState<Date | undefined>(new Date("2000-01-01"))

  const form = useForm<TPayloadUserSignUpValidator>({
    resolver: zodResolver(PayloadUserSignUpValidator),
    defaultValues: {
      email: "test@edoctors.com",
      password: "test",
      name: "test",
      gender: "male",
      dob: "2000-01-01",
      phone: "0909090909",
      address: "123 Main St, Anytown, USA",
    },
  })

  const onSubmit = useCallback(
    async (values: TPayloadUserSignUpValidator) => {
      try {
        // Update the dob field with the selected date from our DatePicker
        if (birthDate) {
          values.dob = birthDate.toISOString().split("T")[0]
        }

        const payload = {
          ...values,
          roles: ["user"],
        }
        console.log("Sending payload:", payload)
        const res = await create(payload)
        if (typeof res === "object") {
          toast.success("Tài khoản của bạn đã được tạo thành công.")
          router.push("/login")
        } else {
          toast.error(res)
        }
      } catch (_) {
        toast.error("Đã xảy ra lỗi khi tạo tài khoản của bạn.")
      }
    },
    [create, router, birthDate],
  )

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng ký tài khoản</h1>
        <p className="text-balance text-sm text-muted-foreground">Nhập email của bạn để đăng ký tài khoản</p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} required className="rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} required className="rounded-md" />
                  </FormControl>
                  <FormMessage />
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
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Chọn giới tính" />
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="0909090909" {...field} required className="rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} required className="rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <DatePicker
                date={birthDate}
                setDate={setBirthDate}
                showMonthYearDropdowns={true}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                minYear={1900}
                maxYear={new Date().getFullYear()}
                locale="vi"
                placeholder="Chọn ngày sinh"
              />
              <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Mật khẩu</FormLabel>
                    <a href="#" className="text-sm text-primary underline-offset-4 hover:underline">
                      Quên mật khẩu?
                    </a>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Nhập mật khẩu của bạn"
                      type="password"
                      {...field}
                      required
                      className="rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4 bg-blue-500" >
              Đăng ký
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Đã có tài khoản?{" "}
        <a href="/login" className="text-primary underline underline-offset-4 hover:text-primary/80">
          Đăng nhập
        </a>
      </div>
    </div>
  )
}

