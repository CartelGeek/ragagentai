import { Button, Form, Input, message, Modal, Select, Typography } from 'antd'
import React from 'react'

const { Title } = Typography

interface UrlModalProps {
  isVisible: boolean
  isLoading: boolean
  onClose: () => void
  onSubmit: (values: { url: string; tags: string[] }) => void

  allTags: string[]
}

const UrlModal: React.FC<UrlModalProps> = ({
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
      onSubmit({ url: values.url, tags: values.tags })
      form.resetFields()
    } catch (error) {
      message.error('Please enter a valid URL and tags')
    }
  }

  return (
    <Modal
      title={<Title level={4}>Enter URL and Tags</Title>}
      open={isVisible}
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
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="url"
          rules={[
            { required: true, message: 'Please enter a URL' },
            { type: 'url', message: 'Please enter a valid URL' },
          ]}
        >
          <Input placeholder="https://example.com" />
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

export default UrlModal
