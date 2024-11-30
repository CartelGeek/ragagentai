'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { SendOutlined } from '@ant-design/icons'
import { Button, Col, Mentions, Row, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function HomePage() {
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const params = useParams<any>()
  const router = useRouter()

  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync: createThread } = Api.thread.create.useMutation()
  const { data: ragVectors } = Api.ragVector.findMany.useQuery({
    select: {
      tags: true,
    },
    where: {
      organizationId: organization?.id,
    },
  }) || { data: [] }

  const [tags, setTags] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    console.log(ragVectors)
    const allTags = ragVectors?.flatMap(item => item.tags || []) || []
    const uniqueTags = [...new Set(allTags)] as string[]
    setTags(
      uniqueTags.map(tag => {
        return { label: tag, value: tag }
      }),
    )
  }, [ragVectors])

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      enqueueSnackbar('Please enter a question', { variant: 'error' })
      return
    }

    setIsLoading(true)
    try {
      // Extract tags from the question and remove them
      const questionTags = tags
        .map(tag => tag.value)
        .filter(tag => question.includes(`@${tag}`))

      let cleanedQuestion = question

      console.log(cleanedQuestion)
      // Remove tags from the question
      for (const questionTag of questionTags) {
        console.log(questionTag)
        cleanedQuestion = cleanedQuestion.replace(`@${questionTag}`, '')
      }

      console.log(cleanedQuestion)

      // Create a new thread
      const newThread = await createThread({
        data: {
          organizationId: organization?.id,
          userId: user?.id as string,
          question: cleanedQuestion,
          tags: questionTags,
        },
      })

      // Redirect to the thread page with the question as a search parameter
      router.push(
        `/organizations/${organization?.id}/chat/${newThread.id}?question=${encodeURIComponent(cleanedQuestion)}`,
      )

      setQuestion('')
    } catch (error) {
      enqueueSnackbar('Failed to create a new thread', {
        variant: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" align="middle" className="h-[calc(100vh-150px)]">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Row
            justify="center"
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            <Col span={24}>
              <Title level={1}>Talk To Me</Title>
              <Text>
                Ask questions to the AI and get information based on the loaded
                knowledge base for your organization.
              </Text>
            </Col>
          </Row>
          <Row justify="center">
            <div className="w-full flex flex-row items-center justify-center">
              <Mentions
                key="mentions"
                style={{ width: '100%' }}
                value={question}
                rows={1}
                onChange={setQuestion}
                options={tags}
                placeholder="Type your question here..."
                onPressEnter={e => {
                  if (!e.shiftKey) {
                    e.preventDefault()
                    handleAskQuestion()
                  }
                }}
                autoFocus
              />

              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleAskQuestion}
                loading={isLoading}
                className="ml-1"
              />
            </div>
          </Row>
          <Row justify="center" style={{ marginTop: '10px' }}>
            <Text type="secondary">
              Use @ to target specific sections of the knowledge base
            </Text>
          </Row>
        </Col>
      </Row>
    </PageLayout>
  )
}
