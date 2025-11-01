// src/components/Form/RadioGroup.jsx
import React from 'react'
import { CFormCheck } from '@coreui/react'

const RadioGroup = ({
  name,
  labelTrue = 'Active',
  labelFalse = 'Inactive',
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="mb-2">
      <CFormCheck
        inline
        type="radio"
        name={name}
        id={`${name}-true`}
        value="true"
        label={labelTrue}
        checked={value === true}
        onChange={() => onChange(true)}
        disabled={disabled}
      />
      <CFormCheck
        inline
        type="radio"
        name={name}
        id={`${name}-false`}
        value="false"
        label={labelFalse}
        checked={value === false}
        onChange={() => onChange(false)}
        disabled={disabled}
      />
    </div>
  )
}

export default RadioGroup
