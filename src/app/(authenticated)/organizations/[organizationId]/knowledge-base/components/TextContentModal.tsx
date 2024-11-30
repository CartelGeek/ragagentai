import { Button, Form, Input, message, Modal, Select, Typography } from 'antd'
import React from 'react'

const { Title } = Typography

interface TextContentModalProps {
  isVisible: boolean
  isLoading: boolean
  onClose: () => void
  onSubmit: (values: { content: string; tags: string[]; title: string }) => void
  allTags: string[]
}

const TextContentModal: React.FC<TextContentModalProps> = ({
  isVisible,
  isLoading,
  onClose,
  onSubmit,
  allTags,
}) => {
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onSubmit({
        content: values.content,
        title: values.title,
        tags: values.tags,
      })
      form.resetFields()
    } catch (error) {
      console.error('Validation failed:', error)
      message.error('Failed to load text content')
    }
  }

  return (
    <Modal
      open={isVisible}
      title={<Title level={4}>Load Text Content</Title>}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} loading={isLoading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Load
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="content"
          label="Text Content"
          rules={[{ required: true, message: 'Please enter the text content' }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item
          name="tags"
          rules={[
            { required: true, message: 'Please select at least one tag' },
          ]}
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Select tags"
            options={allTags.map(tag => ({ value: tag, label: tag }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TextContentModal
