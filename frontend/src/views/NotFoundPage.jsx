import React from 'react'
import { CButton, CContainer, CRow, CCol } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <CContainer className="text-center py-5">
      <CRow className="justify-content-center">
        <CCol md={6}>
          <h1 className="display-3 fw-bold text-danger">404</h1>
          <h2 className="mb-3">Page non trouvée</h2>
          <p className="text-muted mb-4">
            La page que vous cherchez n’existe pas ou a été déplacée.
          </p>
          <CButton color="primary" onClick={() => navigate('/')}>
            Retour à l’accueil
          </CButton>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default NotFoundPage
