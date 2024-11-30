import { Button, Form, Input, message, Modal, Select, Typography } from 'antd'
import React from 'react'

const { Title } = Typography

interface EditModalProps {
  isVisible: boolean
  isLoading: boolean
  title: string
  tags: string[]
  onClose: () => void
  onSubmit: (values: { tags: string[]; title: string }) => void
  allTags: string[]
}

const EditModal: React.FC<EditModalProps> = ({
  isVisible,
  isLoading,
  onClose,
  onSubmit,
  title,
  tags,
  allTags,
}) => {
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onSubmit({
        title: values.title,
        tags: values.tags,
      })
      form.resetFields()
    } catch (error) {
      console.error('Validation failed:', error)
      message.error('Failed to load text content')
    }
  }

  form.setFieldsValue({ title, tags })

  return (
    <Modal
      open={isVisible}
      title={<Title level={4}>Edit</Title>}
      onCancel={onClose}
      footer={[
        <Button key="cancel" loading={isLoading} onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Edit
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

export default EditModal
