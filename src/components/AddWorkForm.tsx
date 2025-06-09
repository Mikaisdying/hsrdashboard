import React from 'react'
import { Button, Input } from 'antd'

interface AddWorkFormProps {
  value: string
  loading: boolean
  onChange: (val: string) => void
  onAdd: () => void
  onCancel: () => void
}

const AddWorkForm: React.FC<AddWorkFormProps> = ({ value, loading, onChange, onAdd, onCancel }) => (
  <div
    style={{
      background: '#18191c',
      borderRadius: 10,
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    }}
  >
    <Input
      placeholder="Nhập tên danh sách..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
      onPressEnter={onAdd}
      disabled={loading}
    />
    <div style={{ display: 'flex', gap: 8 }}>
      <Button type="primary" onClick={onAdd} loading={loading} disabled={!value.trim()}>
        Thêm danh sách
      </Button>
      <Button
        danger
        type="text"
        style={{ fontSize: 22, lineHeight: 1, padding: 0 }}
        onClick={onCancel}
      >
        ×
      </Button>
    </div>
  </div>
)

export default AddWorkForm
