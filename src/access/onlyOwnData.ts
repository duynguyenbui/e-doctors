import type { Access } from 'payload'

export const onlyOwnData: Access = ({ req }) => {
  if (!req.user) return false 

  return {
    recipient: { equals: req.user.id }, 
  }
}
