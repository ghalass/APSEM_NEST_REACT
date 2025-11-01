// src/components/Form/Button.jsx
import React from 'react'
import { CButton, CSpinner } from '@coreui/react'

const Button = ({
  label,
  onClick,
  color = 'primary',
  variant = 'outline',
  size = 'sm',
  disabled = false,
  loading = false,
  icon, // optionnel, tu peux passer une icône React ici
}) => {
  return (
    <CButton
      disabled={disabled || loading}
      onClick={onClick}
      size={size}
      color={color}
      variant={variant}
    >
      <div className="d-flex gap-1 align-items-center justify-content-center">
        {loading && <CSpinner size="sm" />}
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </div>
    </CButton>
  )
}

export default Button
