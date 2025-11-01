import React from 'react'
import { CSpinner, CAlert, CContainer, CButton } from '@coreui/react'
import { useUsersPage } from '../../features/users/useUsersPage'
import { COLUMNS } from './columns'
import CIcon from '@coreui/icons-react'
import { cilLoopCircular } from '@coreui/icons'
import CustomTable from '../components/table/CustomTAble'

const UsersTable = () => {
  const { getAllQuery } = useUsersPage()
  const { data: users = [], isLoading, isError, error, refetch } = getAllQuery

  // 💡 Pas besoin d’un useState + useEffect pour copier les données du query
  // TanStack Query gère déjà les updates.
  const columns = React.useMemo(() => COLUMNS, [])

  return (
    <CContainer fluid className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="fw-bold mb-0">Liste des utilisateurs</h5>
        {/* 🔄 Bouton de rafraîchissement */}

        <CButton size="sm" color="primary" variant="outline" onClick={() => refetch()}>
          <CIcon icon={cilLoopCircular} />
          Rafraîchir
        </CButton>
      </div>

      {/* 🌀 Loading State */}
      {isLoading && (
        <div className="d-flex justify-content-center my-4">
          <CSpinner color="primary" />
        </div>
      )}

      {/* ❌ Error State */}
      {isError && (
        <CAlert color="danger" className="text-center">
          Une erreur est survenue lors du chargement des utilisateurs.
          <br />
          <small>{error?.message}</small>
        </CAlert>
      )}

      {/* ✅ Success */}
      {!isLoading && !isError && users.length > 0 && <CustomTable data={users} columns={columns} />}

      {/* ⚠️ No data */}
      {!isLoading && !isError && users.length === 0 && (
        <CAlert color="warning" className="text-center">
          Aucun utilisateur trouvé.
        </CAlert>
      )}
    </CContainer>
  )
}

export default UsersTable
