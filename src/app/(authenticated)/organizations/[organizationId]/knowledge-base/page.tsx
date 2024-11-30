'use client'

import { useUserContext } from '@/core/context'
import { useUploadPrivate } from '@/core/hooks/upload'
import { Api } from '@/core/trpc'
import {
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Button, Col, Row, Space, Table, Tag, Typography } from 'antd'

import { PageLayout } from '@/designSystem'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import EditModal from './components/EditModal'
import FileUploadModal from './components/FileUploadModal'
import TextContentModal from './components/TextContentModal'
import UrlModal from './components/UrlModal'
const { Title, Text } = Typography

export default function KnowledgeBasePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [newUrl, setNewUrl] = useState('')
  const [newUrlTags, setNewUrlTags] = useState<string[]>([])
  const [fileList, setFileList] = useState<any[]>([])
  const [tags, setTags] = useState<string[]>([])

  const [editingRagVector, setEditingRagVector] = useState(null)
  const [allTags, setAllTags] = useState([])

  const [editModalVisible, setEditModalVisible] = useState(false)

  const [uploadModalVisible, setUploadModalVisible] = useState(false)

  const [urlModalVisible, setUrlModalVisible] = useState(false)

  const [textModalVisible, setTextModalVisible] = useState(false)

  const { mutateAsync: deleteRagVector } = Api.ragVector.delete.useMutation()

  const { mutateAsync: privateToPublicUrl } =
    Api.upload.fromPrivateToPublicUrl.useMutation()
  const { mutateAsync: updateRagVector, isLoading: isLoadingUpdate } =
    Api.ragVector.update.useMutation()
  const { mutateAsync: loadFile, isLoading: isLoadingFile } =
    Api.rag.loadFile.useMutation()
  const { mutateAsync: loadContent, isLoading: isLoadingContent } =
    Api.rag.loadContent.useMutation()
  const { mutateAsync: uploadFile, isLoading: isLoadingUpload } =
    useUploadPrivate()

  const {
    data: ragVectors,
    isLoading,
    refetch,
  } = Api.ragVector.findMany.useQuery({
    where: { organizationId: organization?.id },
    include: { organization: true },
    orderBy: {
      dateCreated: 'desc',
    },
  })

  useEffect(() => {
    if (ragVectors) {
      const tags = Array.from(
        new Set(ragVectors.flatMap(vector => vector.tags)),
      )
      setAllTags(tags)
    }
  }, [ragVectors])

  const handleRawContent = async (values: any) => {
    try {
      await loadContent({
        title: values.title,
        content: values.content,
        tags: values.tag,
        organizationId: organization?.id,
      })
      setUrlModalVisible(false)
      refetch()
      enqueueSnackbar('Content added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error adding content', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    await deleteRagVector({ where: { id } })
    refetch()
    enqueueSnackbar('Knowledge deleted successfully', { variant: 'success' })
  }

  const handleAddUrl = async (values: any) => {
    try {
      await loadFile({
        title: values.url,
        tags: values.tags,
        url: values.url,
        organizationId: organization?.id,
      })
      setUrlModalVisible(false)
      refetch()
      enqueueSnackbar('URL added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error adding URL', { variant: 'error' })
    }
  }

  const handleUpload = async (values: any) => {
    try {
      for (const file of values.files) {
        const { url } = await uploadFile({ file })
        const { url: urlPublicTemporary } = await privateToPublicUrl({ url })

        await loadFile({
          title: file.name,
          tags: values.tags,
          url: urlPublicTemporary,
          organizationId: organization?.id,
        })
      }
      refetch()
      enqueueSnackbar('Files uploaded successfully', { variant: 'success' })
      setUploadModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Error uploading files', { variant: 'error' })
    }
  }

  const handleEdit = record => {
    setEditingRagVector(record)
    setEditModalVisible(true)
  }

  const handleEditSubmit = async (values: any) => {
    await updateRagVector({
      where: { id: editingRagVector.id },
      data: {
        title: values.title,
        tags: values.tags,
      },
    })
    setEditModalVisible(false)
    refetch()
    enqueueSnackbar('Knowledge updated successfully', { variant: 'success' })
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Date Added',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: date => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: tags => <>{tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}</>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Knowledge Base</Title>
      <Text>
        {
          "Manage your organization's knowledge base by uploading files or adding URLs."
        }
      </Text>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row justify="center" style={{ marginTop: 20 }}>
          <Col span={24}>
            <Space>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setUrlModalVisible(true)}
                >
                  Load URL
                </Button>
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={() => setUploadModalVisible(true)}
                >
                  Load Files
                </Button>
                <Button
                  type="primary"
                  icon={<LinkOutlined />}
                  onClick={() => setTextModalVisible(true)}
                >
                  Load Text
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>

        <Table
          loading={isLoading}
          dataSource={ragVectors}
          columns={columns}
          rowKey="id"
        />
      </Space>

      <EditModal
        title={editingRagVector?.title}
        tags={editingRagVector?.tags}
        allTags={allTags}
        isVisible={editModalVisible}
        isLoading={isLoadingUpdate}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleEditSubmit}
      />
      <FileUploadModal
        allTags={allTags}
        isVisible={uploadModalVisible}
        isLoading={isLoadingFile || isLoadingUpload}
        onClose={() => setUploadModalVisible(false)}
        onSubmit={handleUpload}
      />
      <TextContentModal
        allTags={allTags}
        isVisible={textModalVisible}
        isLoading={isLoadingContent}
        onClose={() => setTextModalVisible(false)}
        onSubmit={handleRawContent}
      />
      <UrlModal
        allTags={allTags}
        isVisible={urlModalVisible}
        isLoading={isLoadingFile}
        onClose={() => setUrlModalVisible(false)}
        onSubmit={handleAddUrl}
      />
    </PageLayout>
  )
}
