// src/components/Form/TextInput.jsx
import React from 'react'
import { CFormInput } from '@coreui/react'

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = 'text',
}) => {
  return (
    <div className="mb-2">
      <CFormInput
        type={type}
        floatingLabel={label}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={onChange}
        invalid={!!error}
        disabled={disabled}
      />
      {error && <span className="text-danger fst-italic small">{error}</span>}
    </div>
  )
}

export default TextInput
