import type { Access } from 'payload'

export const canViewOwnProfile: Access = ({ req }) => {
  if (!req.user) return false
  if (req.user.roles.includes('admin')) return true
  return { id: { equals: req.user.id } }
}
