import React, { useRef, useState } from 'react'
import { Menu, Modal, message } from 'antd'
import { deleteWorkApi, deleteTaskApi } from '../../apis/tasks/task.api'
import type { ITask } from '../../apis/tasks/task.interface'

export interface WorkCardMenuProps {
  name: string
  tasks: ITask[]
  workId: string | number
  onDeleted?: () => void
}

export const WorkCardMenu: React.FC<WorkCardMenuProps> = ({ name, tasks, workId, onDeleted }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)

  const handleDeleteWork = async () => {
    try {
      for (const task of tasks) {
        await deleteTaskApi(task.id)
      }
      await deleteWorkApi(workId)
      message.success('Đã xóa cột và các task bên trong!')
      setModalOpen(false)
      setInputValue('')
      if (onDeleted) onDeleted()
    } catch (err) {
      setModalLoading(false)
      message.error('Có lỗi khi xóa cột!')
    }
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'delete') {
      setModalOpen(true)
      setInputValue('')
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else if (key === 'sort') {
      message.info('Chức năng Sắp xếp theo... (demo)')
    } else if (key === 'rename') {
      Modal.info({
        title: 'Sửa tên cột',
        content: 'Chức năng Sửa tên cột (demo)',
      })
    }
  }

  const handleModalOk = async () => {
    setModalLoading(true)
    const value = inputRef.current ? inputRef.current.value : inputValue
    if (value.trim() !== name.trim()) {
      setModalLoading(false)
      message.error('Tên cột không khớp!')
      return
    }
    await handleDeleteWork()
    setModalLoading(false)
  }

  return (
    <>
      <Menu
        onClick={handleMenuClick}
        items={[
          { label: 'Xóa cột', key: 'delete' },
          { label: 'Sắp xếp theo...', key: 'sort' },
          { label: 'Sửa tên cột', key: 'rename' },
        ]}
      />
      <Modal
        open={modalOpen}
        title="Xóa cột"
        onCancel={() => setModalOpen(false)}
        onOk={handleModalOk}
        okText="Xóa"
        okButtonProps={{ danger: true, loading: modalLoading }}
        cancelText="Hủy"
        maskClosable={!modalLoading}
        closable={!modalLoading}
        destroyOnClose
      >
        <div>Nhập tên cột bạn đang xóa để xác nhận:</div>
        <input
          ref={inputRef}
          autoFocus
          style={{
            width: '100%',
            marginTop: 8,
            marginBottom: 16,
            padding: 6,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={name}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleModalOk()
          }}
          disabled={modalLoading}
        />
      </Modal>
    </>
  )
}
