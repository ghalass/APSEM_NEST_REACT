// ============================================================================
// 🔹 BacklogPage.jsx
// Description : Gestion du Backlog (liste des anomalies)
// Inspirée de UsersPage pour cohérence visuelle et fonctionnelle
// ============================================================================

import React, { useState, useMemo } from 'react'
import { CContainer, CSpinner, CAlert, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLoopCircular, cilPlus } from '@coreui/icons'
import { useQuery } from '@tanstack/react-query'
import CustomTable from '../components/table/CustomTable'
import AddBacklogModal from './AddBacklogModal'
import { COLUMNS } from './columns'

const BacklogPage = () => {
  const columns = useMemo(() => COLUMNS, [])

  // ⚙️ Récupération anomalies
  const {
    data: anomalies = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['anomalies'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/anomalie/formatted')
      if (!res.ok) throw new Error('Erreur réseau')
      return res.json()
    },
  })

  // 🔹 Gestion modal ajout anomalie
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <CContainer fluid className="py-3 px-3 px-md-4">
      {/* ========================== En-tête ========================== */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h5 className="fw-bold mb-0 text-primary">📋 Backlog des anomalies</h5>

        <div className="d-flex gap-2">
          {/* Bouton Ajouter */}
          <CButton
            size="sm"
            color="success"
            variant="outline"
            onClick={() => setShowAddModal(true)}
          >
            <CIcon icon={cilPlus} className="me-1" />
            Ajouter
          </CButton>

          {/* Bouton Rafraîchir */}
          <CButton size="sm" color="primary" variant="outline" onClick={() => refetch()}>
            <CIcon icon={cilLoopCircular} className="me-1" />
            Rafraîchir
          </CButton>
        </div>
      </div>

      {/* ========================== Loading ========================== */}
      {isLoading && (
        <div className="d-flex justify-content-center my-4">
          <CSpinner color="primary" />
        </div>
      )}

      {/* ========================== Erreur ========================== */}
      {isError && (
        <CAlert color="danger" className="text-center my-3">
          Une erreur est survenue lors du chargement des anomalies.
          <br />
          <small>{error?.message}</small>
        </CAlert>
      )}

      {/* ========================== Table ========================== */}
      {!isLoading && !isError && anomalies.length > 0 && (
        <div
          className="bg-body rounded-3 shadow-sm p-2 p-md-3"
          style={{
            overflow: 'auto',
            maxHeight: 'calc(100vh - 220px)',
          }}
        >
          <CustomTable
            url="backlog"
            data={anomalies}
            columns={columns}
            tableClassName="table-hover align-middle mb-0"
            responsive
          />
        </div>
      )}

      {/* ========================== Aucun data ========================== */}
      {!isLoading && !isError && anomalies.length === 0 && (
        <CAlert color="warning" className="text-center my-4">
          Aucune anomalie trouvée.
        </CAlert>
      )}

      {/* ========================== Modal d’ajout ========================== */}
      <AddBacklogModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSaved={refetch}
      />
    </CContainer>
  )
}

export default BacklogPage
