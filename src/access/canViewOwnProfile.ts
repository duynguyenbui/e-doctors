import type { Access } from 'payload'
import { checkRole } from '@/access/checkRole'
export const canViewOwnProfile: Access = ({ req }) => {
  console.log('🚀 Headers từ request:', req.headers)
  console.log('🚀 User từ request:', req.user) // Kiểm tra user

  if (!req.user) return false
  if (req.user.roles.includes('admin')) return true
  return { id: { equals: req.user.id } }
}
