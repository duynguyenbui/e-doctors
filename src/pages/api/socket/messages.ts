import { NextApiResponseServerIO } from '@/types'
import { NextApiRequest } from 'next'

const message: string = 'Hello, World!'

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const chatMessages = `chat:messages`

  res.socket.server.io.emit(chatMessages, { message })

  return res.status(200).json({ message })
}
