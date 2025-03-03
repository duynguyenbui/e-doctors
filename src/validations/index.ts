import { z } from 'zod'

export const PayloadUserLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'Password must not be blank.',
  }),
})

export type TPayloadUserLoginValidator = z.infer<typeof PayloadUserLoginValidator>
