import { Access } from 'payload'
import { checkRole } from '@/access/checkRole'
export const canCreateDoctor: Access = ({ req, data }) => {
  const roles = data?.roles || []
  if (roles.includes('doctor')) {
    return checkRole(['admin'], req.user ?? undefined)
  }
  return true
}
