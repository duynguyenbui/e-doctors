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
  email: z.string().email('Email không hợp lệ.' ),
  password: z.string().min(4, {
    message: 'Mật khẩu không được để trống.',
  }),
})

export const PayloadUserSignUpValidator = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: 'Mật khẩu phải có ít nhất 4 ký tự.',
  }),
  name: z.string().min(4, {
    message: 'Tên không được để trống.',
  }),
  gender: z.enum(['male', 'female'], {
    message: 'Giới tính không hợp lệ.',
  }),
  dob: z.string().min(1, {
    message: 'Ngày sinh không được để trống.',
  }),
  phone: z.string()
    .regex(/^\d{10}$/, "Số điện thoại phải có đúng 10 chữ số."),
  address: z.string().min(1, {
    message: 'Địa chỉ không được để trống.',
  }),
})

export const PayloadUserSettingsValidator = z.object({
  email: z.string().email(),
  password: z.string().optional(),
  name: z.string().optional(),
  dob: z.date().optional(),
  gender: z.enum(['male', 'female']).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  avatar: z.instanceof(File).optional().or(z.string().optional()),
})

export const PayloadMedicalRecordValidator = z.object({
  patientId: z.string(),
  physician: z.string(),
  note: z.string().optional(),
  diagnosis: z.string(),
  treatment: z.string(),
  symptoms: z.string(),
  visitDate: z.date(),
  prescriptions: z.array(z.object({
    medication: z.string(),
    dosage: z.string(),
    instructions: z.string(),
  })),
})

export type TPayloadMessageValidator = z.infer<typeof PayloadMessageValidator>
export type TPayloadUserLoginValidator = z.infer<typeof PayloadUserLoginValidator>
export type TPayloadUserSignUpValidator = z.infer<typeof PayloadUserSignUpValidator>
export type TPayloadUserSettingsValidator = z.infer<typeof PayloadUserSettingsValidator>
export type TPayloadMedicalRecordValidator = z.infer<typeof PayloadMedicalRecordValidator>