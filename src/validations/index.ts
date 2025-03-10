import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const PayloadMessageValidator = z.object({
  conversationId: z.string(),
  role: z.enum(['User', 'Doctor']),
  content: z.string().optional(),
  attachments: z.array(z.instanceof(File))
    .refine(files => {return Array.from(files).every(file => file instanceof File)}, { message: "Yêu cầu tệp tin" })
    .refine(files => Array.from(files).every(file => ACCEPTED_IMAGE_TYPES.includes((file as File).type)), "Chỉ chấp nhận các định dạng .jpg, .jpeg, .png và .webp")
    .refine(files => Array.from(files).every(file => (file as File).size < 7000000), { message: 'Kích thước tệp phải nhỏ hơn 7MB.' })
})


export const PayloadUserLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Mật khẩu không được để trống.',
  }),
})

export const PayloadUserSignUpValidator = z.object({
  email: z.string().email(),
  password: z.string().min(3, {
    message: 'Mật khẩu phải có ít nhất 3 ký tự.',
  }),
  name: z.string().min(1, {
    message: 'Tên không được để trống.',
  }),
})

export type TPayloadMessageValidator = z.infer<typeof PayloadMessageValidator>
export type TPayloadUserLoginValidator = z.infer<typeof PayloadUserLoginValidator>
export type TPayloadUserSignUpValidator = z.infer<typeof PayloadUserSignUpValidator>