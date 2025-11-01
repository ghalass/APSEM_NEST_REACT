// src/views/users/UserTable.jsx
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPenNib, cilToggleOff, cilToggleOn, cilTrash } from '@coreui/icons'
import { getUserRole } from '../../utils/func'

const UserTable = ({ data, onEdit, onDelete }) => {
  const displayColumnMd = 'd-none d-md-table-cell'
  const displayColumnSm = 'd-none d-sm-table-cell'

  return (
    <CTable responsive="md" striped hover id="myTable">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
          <CTableHeaderCell className={displayColumnSm} scope="col">
            Prénom
          </CTableHeaderCell>
          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          <CTableHeaderCell className={displayColumnMd} scope="col">
            Rôle
          </CTableHeaderCell>
          <CTableHeaderCell className={displayColumnMd} scope="col">
            Active
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <CButton
                  size="sm"
                  color="danger"
                  variant="outline"
                  className="rounded-pill"
                  aria-label="Supprimer"
                  // onClick={() => onDelete(item)}
                >
                  <CIcon icon={cilTrash} />
                </CButton>{' '}
                <CButton
                  size="sm"
                  color="primary"
                  variant="outline"
                  className="rounded-pill"
                  aria-label="Modifier"
                  // onClick={() => onEdit(item)}
                >
                  <CIcon icon={cilPenNib} />
                </CButton>{' '}
                {item?.name}
              </CTableDataCell>

              <CTableDataCell className={displayColumnSm}>{item?.lastName}</CTableDataCell>
              <CTableDataCell>{item?.email}</CTableDataCell>
              <CTableDataCell className={displayColumnMd}>{getUserRole(item)}</CTableDataCell>
              <CTableDataCell className={displayColumnMd}>
                {item?.active ? (
                  <>
                    <CIcon icon={cilToggleOn} size="xl" className="text-success" />
                    <span className="d-none">Oui</span>
                  </>
                ) : (
                  <>
                    <CIcon icon={cilToggleOff} size="xl" className="text-secondary" />
                    <span className="d-none">Non</span>
                  </>
                )}
              </CTableDataCell>
            </CTableRow>
          ))
        ) : (
          <CTableRow>
            <CTableDataCell className="text-center" colSpan={5}>
              Aucune donnée trouvée.
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}

export default UserTable
