import { getServerSideUser } from '@/get-serverside-user'
import { AccountForm } from '@/components/AccountForm'
import { redirect } from 'next/navigation'

export default async function Page() {
  const { user } = await getServerSideUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <AccountForm user={user} />
    </div>
  )
}
