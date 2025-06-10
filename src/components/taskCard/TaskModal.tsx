import React from 'react'
import { Modal, Typography, Button, Divider, Input, List, message } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import { updateTaskApi } from '../../apis/tasks/task.api'
import type { Comment } from '../../apis/tasks/task.interface'
import {
  UserOutlined,
  TeamOutlined,
  TagOutlined,
  ProfileOutlined,
  CalendarOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'

interface TaskModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  createdBy?: string
  createdAt?: string
  taskId?: string
  onTaskUpdated?: () => void
}

const { Title, Paragraph, Text } = Typography

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  title,
  description: descriptionProp,
  createdBy,
  createdAt,
  taskId,
  onTaskUpdated,
}) => {
  const [comment, setComment] = React.useState('')
  const [comments, setComments] = React.useState<Comment[]>([])
  const [editingDesc, setEditingDesc] = React.useState(false)
  const [descValue, setDescValue] = React.useState(descriptionProp || '')
  const [descLoading, setDescLoading] = React.useState(false)
  const [editingTitle, setEditingTitle] = React.useState(false)
  const [titleValue, setTitleValue] = React.useState(title)
  const [titleLoading, setTitleLoading] = React.useState(false)

  const handleAddComment = () => {
    if (!comment.trim()) return
    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        author: 'Bạn',
        content: comment,
        createdAt: new Date().toLocaleString(),
      },
    ])
    setComment('')
    message.success('Đã thêm bình luận!')
  }

  const handleSaveDesc = async () => {
    if (!taskId) return
    setDescLoading(true)
    try {
      await updateTaskApi(taskId, { description: descValue })
      setEditingDesc(false)
      if (onTaskUpdated) onTaskUpdated() // Gọi callback sau khi cập nhật thành công
    } catch (err) {
      message.error('Cập nhật mô tả thất bại!')
    } finally {
      setDescLoading(false)
    }
  }

  const handleSaveTitle = async () => {
    if (!taskId || !titleValue.trim()) return
    setTitleLoading(true)
    try {
      await updateTaskApi(taskId, { name: titleValue })
      setEditingTitle(false)
      if (onTaskUpdated) onTaskUpdated() // Gọi callback sau khi cập nhật thành công
    } catch {
      message.error('Cập nhật tiêu đề thất bại!')
    } finally {
      setTitleLoading(false)
    }
  }

  const handleDeleteComment = (id: string) => {
    console.log('handleDeleteComment called, id:', id)
    setComments((prev) => prev.filter((c) => c.id !== id))
    message.success('Đã xóa bình luận!')
  }

  React.useEffect(() => {
    setTitleValue(title)
  }, [title])

  React.useEffect(() => {
    if (open) {
      setDescValue(descriptionProp || '')
    }
  }, [open, taskId])

  React.useEffect(() => {
    if (!editingDesc) {
      setDescValue(descriptionProp || '')
    }
  }, [descriptionProp])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={null}
      width={1000}
      centered
      styles={{ body: { height: '80vh' } }}
    >
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Left: Task info & comments */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {editingTitle ? (
            <Input
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              onPressEnter={(e) => {
                e.preventDefault()
                if (titleValue.trim()) {
                  handleSaveTitle()
                } else {
                  setEditingTitle(false)
                }
              }}
              onBlur={() => setEditingTitle(false)}
              disabled={titleLoading}
              autoFocus
              style={{ marginBottom: 0, fontWeight: 600, fontSize: 20 }}
            />
          ) : (
            <Title
              level={4}
              style={{ marginBottom: 0, cursor: 'pointer' }}
              onClick={() => setEditingTitle(true)}
              title="Nhấn để đổi tiêu đề"
            >
              {titleValue}
            </Title>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '8px 0 2px 0' }}>
            <BarsOutlined style={{ color: '#b0b6be' }} />
            <span style={{ fontWeight: 500 }}>Mô tả</span>
          </div>
          {editingDesc ? (
            <div style={{ marginBottom: 8 }}>
              <Input.TextArea
                value={descValue}
                onChange={(e) => setDescValue(e.target.value)}
                autoSize={{ minRows: 3, maxRows: 6 }}
                placeholder="Nhập mô tả..."
                style={{ marginBottom: 8 }}
                onPressEnter={(e) => {
                  e.preventDefault()
                  handleSaveDesc()
                }}
              />
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <Button
                  type="primary"
                  loading={descLoading}
                  onClick={() => {
                    console.log('Button Lưu clicked')
                    handleSaveDesc()
                  }}
                >
                  Lưu
                </Button>
                <Button
                  onClick={() => {
                    setEditingDesc(false)
                    setDescValue(descriptionProp || '')
                  }}
                >
                  Hủy
                </Button>
              </div>
            </div>
          ) : (
            <Paragraph
              type="secondary"
              style={{ marginBottom: 8, cursor: 'pointer' }}
              onClick={() => setEditingDesc(true)}
            >
              <span>{descValue || 'Chưa có mô tả. Nhấn để thêm.'}</span>
            </Paragraph>
          )}
          {createdBy && (
            <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
              Người tạo: {createdBy}
            </Text>
          )}
          {createdAt && (
            <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
              Ngày tạo: {createdAt}
            </Text>
          )}
          <Divider style={{ margin: '12px 0' }} />
          <div style={{ marginBottom: 8, fontWeight: 600 }}>Hoạt động</div>
          <Input.TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Viết bình luận..."
            autoSize={{ minRows: 2, maxRows: 4 }}
            onPressEnter={(e) => {
              e.preventDefault()
              handleAddComment()
            }}
            style={{ marginBottom: 8 }}
          />
          <Button type="primary" onClick={handleAddComment} disabled={!comment.trim()}>
            Bình luận
          </Button>
          <List
            dataSource={comments}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    danger
                    size="small"
                    onClick={() => {
                      console.log('Delete button clicked, comment id:', item.id)
                      handleDeleteComment(item.id)
                    }}
                    key="delete"
                  >
                    Xóa
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <span style={{ fontWeight: 500 }}>
                      {item.author}{' '}
                      <span style={{ color: '#888', fontSize: 12 }}>({item.createdAt})</span>
                    </span>
                  }
                  description={item.content}
                />
              </List.Item>
            )}
            style={{ marginTop: 12, maxHeight: 180, overflowY: 'auto' }}
            locale={{ emptyText: 'Chưa có bình luận nào.' }}
          />
        </div>
        {/* Right: Action buttons */}
        <div style={{ width: 220, flexShrink: 0, marginTop: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button block icon={<UserOutlined />} style={{ justifyContent: 'flex-start' }}>
              Tham gia
            </Button>
            <Button block icon={<TeamOutlined />} style={{ justifyContent: 'flex-start' }}>
              Thành viên
            </Button>
            <Button block icon={<TagOutlined />} style={{ justifyContent: 'flex-start' }}>
              Nhãn
            </Button>
            <Button block icon={<ProfileOutlined />} style={{ justifyContent: 'flex-start' }}>
              Việc cần làm
            </Button>
            <Button block icon={<CalendarOutlined />} style={{ justifyContent: 'flex-start' }}>
              Ngày
            </Button>
            <Button block icon={<PaperClipOutlined />} style={{ justifyContent: 'flex-start' }}>
              Đính kèm
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TaskModal
