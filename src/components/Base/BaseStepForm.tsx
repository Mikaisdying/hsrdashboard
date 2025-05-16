import React from 'react'
import BaseModal from './BaseModal'
import type { ReactNode, ReactElement } from 'react'

interface BaseStepFormProps {
  open: boolean
  onClose: () => void
  width?: number | string
  children: ReactNode
  bodyStyle?: React.CSSProperties
  closeIcon?: ReactNode
}

const BaseStepForm = ({
  open,
  onClose,
  width = 600,
  children,
  bodyStyle,
  closeIcon,
}: BaseStepFormProps): ReactElement => {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      width={width}
      bodyStyle={{
        borderRadius: 16,
        padding: 0,
        ...bodyStyle,
      }}
      closeIcon={closeIcon}
      position="center"
    >
      {children}
    </BaseModal>
  )
}

export default BaseStepForm
