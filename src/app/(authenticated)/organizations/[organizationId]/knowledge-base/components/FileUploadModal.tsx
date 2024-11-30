import { InboxOutlined } from '@ant-design/icons'
import { Button, message, Modal, Select, Upload } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const { Dragger } = Upload

interface FileUploadModalProps {
  isVisible: boolean
  isLoading: boolean
  onClose: () => void
  onSubmit: (values: { tags: string[]; files: File[] }) => void
  allTags: string[]
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isVisible,
  isLoading,
  onClose,
  onSubmit,
  allTags,
}) => {
  const [fileList, setFileList] = useState<any[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const router = useRouter()

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error('Please select a file to upload')
      return
    }

    onSubmit({ tags: selectedTags, files: fileList })
  }

  const props = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file])
      return false
    },
    fileList,
  }

  return (
    <Modal
      title="Upload Files"
      open={isVisible}
      onOk={handleUpload}
      footer={[
        <Button key="cancel" onClick={onClose} loading={isLoading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleUpload}
        >
          Load
        </Button>,
      ]}
      onCancel={onClose}
      okText="Upload"
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">.pdf, .docx, .csv</p>
      </Dragger>
      <Select
        mode="tags"
        style={{ width: '100%', marginTop: '16px' }}
        placeholder="Select tags"
        onChange={(tags: string[]) => setSelectedTags(tags)}
        options={allTags.map(tag => ({ value: tag, label: tag }))}
      />
    </Modal>
  )
}

export default FileUploadModal
