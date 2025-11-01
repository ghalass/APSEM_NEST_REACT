// src/components/Form/SelectInput.jsx
import React from 'react'
import { CFormSelect } from '@coreui/react'

const SelectInput = ({
  id,
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  placeholder = 'Choisir...',
  error,
}) => {
  return (
    <div className="mb-2">
      <CFormSelect
        id={id}
        floatingClassName="mb-2"
        floatingLabel={label}
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
        invalid={!!error}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.title}
          </option>
        ))}
      </CFormSelect>
      {error && <span className="text-danger fst-italic small">{error}</span>}
    </div>
  )
}

export default SelectInput
