import { USER_TYPE } from '../../utils/types'
import CIcon from '@coreui/icons-react'
import { cilToggleOff, cilToggleOn } from '@coreui/icons'

export const COLUMNS = [
  {
    accessorKey: 'firstName',
    header: 'Nom',
  },
  {
    accessorKey: 'lastName',
    header: 'Prénom',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Rôle',
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'select',
      selectOptions: [
        ...USER_TYPE.map((item) => ({
          value: item.value,
          label: item.title,
        })),
      ],
    },
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: (info) =>
      info.getValue() ? (
        <>
          <CIcon icon={cilToggleOn} size="xl" className="text-success" />
          <span className="d-none">Oui</span>
        </>
      ) : (
        <>
          <CIcon icon={cilToggleOff} size="xl" className="text-secondary" />
          <span className="d-none">Non</span>
        </>
      ),
    meta: {
      filterVariant: 'select',
      selectOptions: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'In Active' },
      ],
    },
    filterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId) ? 'true' : 'false'
      return rowValue === filterValue
    },
  },
]
