export const checkRole = (roles: string[], user?: { roles: string[] }) => {
  if (!user || !user.roles) return false
  return user.roles.some((role) => roles.includes(role))
}
