// src/components/Form/AlertMessage.jsx
import React from 'react'
import { CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBellExclamation } from '@coreui/icons'

const AlertMessage = ({ message, color = 'danger', icon = cilBellExclamation }) => {
  if (!message) return null

  return (
    <CAlert color={color} className="mb-0 mt-2 py-2 d-flex align-items-center gap-2">
      {icon && <CIcon icon={icon} size="lg" />}
      <span>{message}</span>
    </CAlert>
  )
}

export default AlertMessage
