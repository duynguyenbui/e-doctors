import { getConversations } from '@/actions/conversation'
import ConversationCard from '@/components/ConversationCard'
import React from 'react'

export default async function Page() {

  const { data: conversations } = await getConversations()

  const sortedConversations = conversations?.sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime() 
    const dateB = new Date(b.updatedAt).getTime()
    return dateB - dateA 
  })

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 mt-32">Đối tác y tế của bạn</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-5">
        {(sortedConversations ?? []).map((conversation) => (
          <ConversationCard 
            key={conversation.id} 
            id={conversation.id} 
            name={conversation.name} 
            participants={conversation.participants}  
            updatedAt={conversation.updatedAt} 
          />
        ))}
      </div>
    </div>
  )
}
