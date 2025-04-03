"use client"

import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { BookUser, DoorOpen, Eye, ImageIcon, LinkIcon, Scissors, Send, X } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { CHAT_KEY, MAX_ATTACHMENTS, ModalType } from "@/constants"
import { Loader } from "@/components/Loader"
import SocketIndicator from "@/components/SocketIndicator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useChatQuery } from "@/hooks/useChatQuery"
import { useAuth } from "@/providers/AuthProvider"
import { useSocket } from "@/providers/SocketProvider"
import type { Conversation, Message } from "@/payload-types"
import { PayloadMessageValidator, type TPayloadMessageValidator } from "@/validations"
import { ImageMessageBlock } from "@/components/ImageMessageBlock"
import ReactMarkdown from "react-markdown"
import { useModals } from "@/stores"

export function Chat({
  conversations,
  currentConversationId,
}: {
  conversations: Conversation[]
  currentConversationId: string
}) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const imageInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { messages, isLoading, error } = useChatQuery()
  const [messagesClient, setMessagesClient] = useState<Message[]>([])
  const { user } = useAuth()
  const { isConnected, socket } = useSocket()
  const chatKey = `${CHAT_KEY}:${currentConversationId}`
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [attachmentClients, setAttachmentClients] = useState<File[]>([])
  const { open } = useModals()

  const form = useForm<TPayloadMessageValidator>({
    resolver: zodResolver(PayloadMessageValidator),
    defaultValues: {
      conversationId: currentConversationId,
      content: "",
      attachments: [],
      role: user?.roles.includes("doctor") ? "Doctor" : "User",
    },
  })

  const { isSubmitting } = form.formState

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  const currentConversation = conversations.find((conv) => conv.id === currentConversationId) || conversations[0]

  const currentPatient = currentConversation?.participants.find((participant: any) => {
    return !participant.roles.includes("doctor")
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (attachmentClients.length >= MAX_ATTACHMENTS) {
      toast.error("Bạn chỉ có thể tải lên tối đa 3 tệp đính kèm")
      return
    }

    const files = e.target.files
    if (files && files.length > 0) {
      const newAttachments = Array.from(files)
      setAttachmentClients((prev) => [...prev, ...newAttachments])
      form.setValue("attachments", [...(form.getValues("attachments") || []), ...newAttachments])
    }
  }

  const handleCut = () => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart
      const end = inputRef.current.selectionEnd
      const content = form.getValues("content")

      if (start !== null && end !== null && start !== end && content) {
        navigator.clipboard.writeText(content.slice(start, end))
        const newText = content.slice(0, start) + content.slice(end)
        form.setValue("content", newText)
      }
    }
  }

  const handleLinkInsert = () => {
    const content = form.getValues("content")

    if (linkUrl) {
      const newText = content + ` [Link](${linkUrl})`
      form.setValue("content", newText)
      setLinkUrl("")
      setIsLinkDialogOpen(false)
    }
  }

  const handleConversationChange = (id: string) => {
    router.push(`/conversations/chat/${id}`)
  }

  const handleAttachmentRemove = (attachment: File) => {
    setAttachmentClients((prev) => prev.filter((a) => a.name !== attachment.name))
    form.setValue("attachments", form.getValues("attachments")?.filter((a) => a.name !== attachment.name) || [])
  }

  const onSubmit = async (values: TPayloadMessageValidator) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để gửi tin nhắn")
      return
    }

    const { success, data } = PayloadMessageValidator.safeParse(values)

    if (!success) {
      toast.error("Vui lòng điền đầy đủ các trường")
      return
    }

    const { content, attachments } = data

    if (!content && !attachments.length) {
      toast.error("Nội dung hoặc tệp đính kèm là bắt buộc")
      return
    }

    const formData = new FormData()

    formData.append("conversationId", currentConversationId)
    formData.append("role", data.role)
    if (data.content) {
      formData.append("content", data.content)
    }
    if (data.attachments && data.attachments.length > 0) {
      for (const file of data.attachments) {
        formData.append("attachments", file, file.name)
      }
    }

    axios
      .post("/api/socket/messages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })

    setAttachmentClients([])
    form.setValue("content", "")
    form.setValue("attachments", [])
  }

  useEffect(() => {
    if (isConnected) {
      socket?.on(chatKey, (message: any) => {
        setMessagesClient((prev) => [...prev, message])
      })
    }
    return () => {
      socket?.off(chatKey)
    }
  }, [isConnected, socket, chatKey])

  useEffect(() => {
    if (messages) {
      setMessagesClient(messages)
    }
  }, [messages])

  useEffect(() => {
    setTimeout(scrollToBottom, 1000)
  }, [messagesClient, messages])

  useEffect(() => {
    if (user?.roles?.includes("doctor")) {
      form.setValue("role", "Doctor")
    }
  }, [user, form])

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-64 border-r p-4 overflow-y-auto bg-blue-50 border-blue-100">
        <h2 className="text-lg font-semibold mb-4 text-blue-700">Cuộc trò chuyện</h2>
        {conversations.map((conv) => (
          <Button
            key={conv.id}
            variant={conv.id === currentConversationId ? "default" : "ghost"}
            className={cn(
              "w-full justify-start mb-2 mr-2 text-sm md:text-base truncate",
              conv.id === currentConversationId
                ? "bg-blue-200 text-blue-800 hover:bg-blue-300"
                : "text-blue-700 hover:bg-blue-100"
            )}
            onClick={() => handleConversationChange(conv.id)}
          >
            {conv.name}
            {conv.id === currentConversationId && <DoorOpen className="w-4 h-4 ml-2" />}
          </Button>
        ))}
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center gap-2">
            <span className="font-medium text-blue-700">{currentConversation?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {user?.roles.includes("doctor") && (
              <div className="flex items-center gap-2">
                <Button
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
                  variant="outline"
                  onClick={() => open({ modal: ModalType.MEDICAL_RECORDS, data: currentPatient })}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  <span className="font-medium text-sm">Xem hồ sơ bệnh án của {(currentPatient as any)?.name}</span>
                </Button>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600 border border-blue-600"
                  variant="default"
                  onClick={() => open({ modal: ModalType.MEDICAL_RECORD_NEW, data: currentPatient })}
                >
                  <BookUser className="h-4 w-4 mr-2" />
                  <span className="font-medium text-sm">Tạo mới hồ sơ bệnh án</span>
                </Button>
              </div>
            )}
            <SocketIndicator />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 bg-gradient-to-b from-white to-blue-50">
          {!isLoading &&
            messagesClient?.map((message, index) => {
              const currentUserIsDoctor = user?.roles?.includes("doctor")
              const isDoctor = message.role === "Doctor"
              const shouldShowOnRight = (currentUserIsDoctor && isDoctor) || (!currentUserIsDoctor && !isDoctor)
              const isCurrentUser = message.sender === user?.id
              const senderId = typeof message.sender === "string" ? message.sender : message.sender.id

 
              const messageTime = isCurrentUser
              ? "Bạn"
              : isDoctor
              ? `Dr.${typeof message.sender === "string" ? `#${senderId}` : message.sender.name || `#${senderId}`}`
              : ` BN ${typeof message.sender === "string" ? currentConversation?.name || "Unknown" : message.sender.name || currentConversation?.name || "Unknown"}`
              
              const messageTime = message.createdAt
                ? format(new Date(message.createdAt), "HH:mm, dd/MM/yyyy")
                : "Không rõ thời gian"

              return (
                <div key={index} className={`flex ${shouldShowOnRight ? "justify-end" : "justify-start"} mb-4`}>
                  <Card
                    className={cn(
                      "p-4 max-w-[80%] shadow-sm",
                      isDoctor ? "bg-blue-100 border-blue-200" : "bg-cyan-50 border-cyan-200"
                    )}
                  >
                    <div className={`flex gap-4 ${shouldShowOnRight ? "flex-row-reverse" : "flex-row"}`}>
                      <div
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center text-white",
                          isDoctor ? "bg-blue-600" : "bg-cyan-500"
                        )}
                      >
                        {senderName.charAt(0) || "N/A"}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">
                          {senderName} • {messageTime}
                        </div>
                        <div className={cn("text-foreground", isDoctor ? "text-blue-900" : "text-cyan-900")}>
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                        {message.attachments &&
                          message.attachments.length > 0 &&
                          message.attachments.map((attachment) => (
                            <div key={attachment.id} className="mt-2">
                              <ImageMessageBlock media={attachment.media} aspectRatio="auto" />
                            </div>
                          ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          <div ref={messagesEndRef} />
          {(isLoading || error) && <Loader className="text-blue-500" />}
        </div>

        <div className="p-4 border-t bg-blue-50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <Input
                      disabled={isLoading || isSubmitting}
                      ref={inputRef}
                      className="w-full bg-white border-blue-200 focus-visible:ring-blue-300"
                      placeholder="Nhập câu hỏi của bạn..."
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <Button
                      disabled={isLoading || isSubmitting}
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      disabled={isLoading || isSubmitting}
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      onClick={() => setIsLinkDialogOpen(true)}
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      onClick={handleCut}
                      disabled={isLoading || isSubmitting}
                    >
                      <Scissors className="h-4 w-4" />
                    </Button>
                    {attachmentClients.length > 0 &&
                      attachmentClients.map((attachment) => (
                        <Badge
                          key={attachment.name}
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                          onClick={() => handleAttachmentRemove(attachment)}
                        >
                          {attachment.name}
                          <X className="w-4 h-4 ml-1" />
                        </Badge>
                      ))}
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={isLoading}>
                    <Send className="h-4 w-4 mr-2" />
                    Gửi
                  </Button>
                </div>
              </div>
              <Input type="file" ref={imageInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
            </form>
          </Form>
        </div>

        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogContent className="bg-white border-blue-200">
            <DialogHeader>
              <DialogTitle className="text-blue-700">Chèn liên kết</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="url" className="text-blue-700">
                  URL
                </Label>
                <Input
                  id="url"
                  placeholder="Vui lòng nhập URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="bg-white border-blue-200 focus-visible:ring-blue-300"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLinkDialogOpen(false)}
                className="text-blue-700 hover:bg-blue-100"
              >
                Hủy bỏ
              </Button>
              <Button type="button" onClick={handleLinkInsert} className="bg-blue-600 hover:bg-blue-700 text-white">
                Xác nhận
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}