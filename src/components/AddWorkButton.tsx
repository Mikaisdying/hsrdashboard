import React from 'react'

interface AddWorkButtonProps {
  onClick: () => void
}

const AddWorkButton: React.FC<AddWorkButtonProps> = ({ onClick }) => (
  <div
    style={{
      border: '2px dashed',
      borderRadius: '10px',
      padding: '10px',
      minHeight: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      height: '100%',
    }}
    onClick={onClick}
  >
    + Thêm work
  </div>
)

export default AddWorkButton
