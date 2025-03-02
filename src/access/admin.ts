import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const admin: Access = ({ req }) => {
  const user = req.user || undefined

  return checkRole(['admin'], user)
}
