'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { CloseCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Button, List, message, Spin, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

const { Title } = Typography

export default function MyThreadsPage() {
  const { organization, user } = useUserContext()
  const router = useRouter()
  const {
    data: threads,
    isLoading,
    error,
    refetch,
  } = Api.thread.findMany.useQuery({
    where: {
      userId: user?.id,
      organizationId: organization?.id,
    },
    orderBy: {
      dateCreated: 'desc',
    },
  })

  const deleteThreadMutation = Api.thread.delete.useMutation()

  const deleteThread = async (threadId: string) => {
    try {
      await deleteThreadMutation.mutateAsync({ where: { id: threadId } })
      message.success('Thread deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete thread')
      console.error('Error deleting thread:', error)
    }
  }

  if (isLoading) return <Spin size="large" />
  if (error) return <div>Error: {error.message}</div>

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Threads</Title>
      <List
        dataSource={threads}
        renderItem={thread => (
          <List.Item
            className="cursor-pointer"
            onClick={() =>
              router.push(
                `/organizations/${thread.organizationId}/chat/${thread.id}`,
              )
            }
            actions={[
              <Button
                key="delete"
                type="text"
                className="text-red-500"
                onClick={e => {
                  e.stopPropagation()
                  deleteThread(thread.id)
                }}
                disabled={deleteThreadMutation.isLoading}
              >
                {deleteThreadMutation.isLoading ? (
                  <LoadingOutlined />
                ) : (
                  <CloseCircleFilled />
                )}
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={thread.question}
              description={
                <>
                  <div>
                    {thread.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                  <div className="mt-1">
                    {dayjs(thread.dateCreated).format('MMMM D, YYYY')}
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
