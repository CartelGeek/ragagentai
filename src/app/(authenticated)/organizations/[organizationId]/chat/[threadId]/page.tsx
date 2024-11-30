'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { RobotOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, List, Spin, Typography } from 'antd'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

const { Title, Text } = Typography

export default function ThreadPage() {
  const { user, organization } = useUserContext()
  const { threadId } = useParams()
  const searchParams = useSearchParams()
  const [newQuestion, setNewQuestion] = useState('')
  const [isAsking, setIsAsking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    data: thread,
    isLoading,
    refetch,
  } = Api.thread.findUnique.useQuery({
    where: { id: threadId as string },
    include: { messages: { orderBy: { dateCreated: 'asc' } } },
  })

  const createMessageMutation = Api.message.create.useMutation()
  const generateTextMutation = Api.rag.generateText.useMutation()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [thread?.messages])

  useEffect(() => {
    const question = searchParams.get('question')
    if (question) {
      handleAskQuestion(question)
      // Remove the question from the URL after handling it
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete('question')
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${newSearchParams}`,
      )
    }
  }, [searchParams])

  const handleAskQuestion = async (question: string = newQuestion) => {
    if (!question.trim()) return
    setIsAsking(true)

    try {
      // Create user message
      await createMessageMutation.mutateAsync({
        data: {
          threadId: threadId as string,
          answer: question,
          type: 'user',
        },
      })

      setNewQuestion('')
      refetch()

      // Generate AI response
      const { answer: aiResponse } = await generateTextMutation.mutateAsync({
        prompt: question,
        tags: [],
        organizationId: organization?.id,
        history: thread?.messages?.map(item => item.answer),
      })

      // Create AI message
      await createMessageMutation.mutateAsync({
        data: {
          threadId: threadId as string,
          answer: aiResponse,
          type: 'ai',
        },
      })

      refetch()
    } catch (error) {
      console.error('Error asking question:', error)
    } finally {
      setIsAsking(false)
    }
  }

  if (isLoading) {
    return <Spin size="large" />
  }

  return (
    <PageLayout layout="narrow">
      <div className="flex flex-col h-[calc(100vh-74px)]">
        <div
          className="flex-grow overflow-auto p-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <Title level={2}>Thread: {thread?.question}</Title>
          <div className="mb-4">
            {thread?.tags?.map((tag, index) => (
              <Text key={index} className="mr-2 text-blue-500">
                #{tag}
              </Text>
            ))}
          </div>

          <List
            itemLayout="horizontal"
            dataSource={thread?.messages}
            split={false}
            renderItem={message => (
              <List.Item>
                <div
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                >
                  <div
                    className={`flex flex-col ${message.type === 'user' ? 'items-end max-w-[70%]' : 'items-start'} `}
                  >
                    <div className="flex items-center mb-1">
                      <Avatar
                        className={'mr-2'}
                        size={25}
                        icon={
                          message.type === 'user' ? (
                            <UserOutlined />
                          ) : (
                            <RobotOutlined />
                          )
                        }
                        style={{
                          backgroundColor:
                            message.type === 'user' ? '#1890ff' : '#52c41a',
                        }}
                      />
                      <Text strong>{message.type === 'user' ? '' : ''}</Text>
                    </div>
                    <div
                      className={`mt-2 rounded-lg ${message.type === 'user' ? 'p-3 bg-gray-200' : 'bg-white w-full'}`}
                    >
                      <ReactMarkdown className="text-black">
                        {message.answer}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          >
            {isAsking && (
              <List.Item>
                <div className={`flex justify-start w-full`}>
                  <div className={`flex flex-col items-start`}>
                    <div className="flex items-center mb-1">
                      <Avatar
                        className={'mr-2'}
                        size={25}
                        icon={<RobotOutlined />}
                        style={{
                          backgroundColor: '#52c41a',
                        }}
                      />
                    </div>
                    <div className={`mt-2 rounded-lg bg-white w-full`}>
                      <Spin />
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          </List>

          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white border-t">
          <div style={{ position: 'relative' }}>
            <Input.TextArea
              value={newQuestion}
              onChange={e => setNewQuestion(e.target.value)}
              placeholder="Ask a question..."
              autoSize={{ minRows: 2, maxRows: 6 }}
              autoFocus
              onPressEnter={e => {
                if (!e.shiftKey) {
                  e.preventDefault()
                  handleAskQuestion()
                }
              }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={() => handleAskQuestion()}
              loading={isAsking}
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
              }}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
