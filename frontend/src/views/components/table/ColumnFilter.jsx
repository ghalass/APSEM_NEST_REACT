// src/components/common/ColumnFilter.jsx
import { CFormInput, CFormSelect } from '@coreui/react'

const ColumnFilter = ({ column, table }) => {
  const value = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()
  const { filterVariant, selectOptions } = column.columnDef.meta ?? {}

  if (typeof value === 'number') {
    return (
      <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
        <CFormInput
          type="number"
          value={columnFilterValue?.[0] ?? ''}
          onChange={(e) => column.setFilterValue((old) => [e.target.value, old?.[1]])}
          placeholder={`Min`}
          className="w-24 border  rounded"
          size="sm"
          aria-label="sm input example"
          onClick={(e) => e.stopPropagation()}
        />

        <CFormInput
          type="number"
          value={columnFilterValue?.[1] ?? ''}
          onChange={(e) => column.setFilterValue((old) => [old?.[0], e.target.value])}
          placeholder={`Max`}
          size="sm"
          aria-label="sm input example"
          className="w-36 border  rounded"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )
  }

  if (filterVariant === 'select') {
    return (
      <CFormSelect
        size="sm"
        value={columnFilterValue ?? ''}
        onChange={(e) => column.setFilterValue(e.target.value)}
      >
        <option value="">Tous</option>
        {(selectOptions || []).map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </CFormSelect>
    )
  }

  return (
    <CFormInput
      type="search"
      size="sm"
      aria-label="sm input example"
      className="w-36 border  rounded"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Chercher...`}
      value={columnFilterValue ?? ''}
    />
  )
}

export default ColumnFilter
