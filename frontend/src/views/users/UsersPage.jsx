import React, { useState, useMemo } from 'react'
import { CSpinner, CAlert, CContainer, CButton } from '@coreui/react'
import { useUsersPage } from '../../features/users/useUsersPage'
import { COLUMNS } from './columns'
import CIcon from '@coreui/icons-react'
import { cilLoopCircular, cilPlus } from '@coreui/icons'
import CustomTable from '../components/table/CustomTable'
import AddUserModal from './AddUserModal'

const UsersPage = () => {
  const { getAllQuery } = useUsersPage()
  const { data: users = [], isLoading, isError, error, refetch } = getAllQuery

  const columns = useMemo(() => COLUMNS, [])

  // 🔹 State pour afficher le modal d’ajout
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <CContainer fluid className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
        <h5 className="fw-bold mb-0">Liste des utilisateurs</h5>

        <div className="d-flex gap-2">
          {/* Bouton ajouter */}
          <CButton
            size="sm"
            color="success"
            variant="outline"
            onClick={() => setShowAddModal(true)}
          >
            <CIcon icon={cilPlus} className="me-1" />
            Ajouter
          </CButton>

          {/* Bouton rafraîchir */}
          <CButton size="sm" color="primary" variant="outline" onClick={() => refetch()}>
            <CIcon icon={cilLoopCircular} className="me-1" />
            Rafraîchir
          </CButton>
        </div>
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

      {/* ➕ Modal ajout utilisateur */}
      <AddUserModal visible={showAddModal} onClose={() => setShowAddModal(false)} />
    </CContainer>
  )
}

export default UsersPage
