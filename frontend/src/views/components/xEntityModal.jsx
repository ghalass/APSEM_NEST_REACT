// src/components/common/EntityModal.jsx
import React from 'react'
import {
  CAlert,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import useUIStore from '../../stores/store'
import Button from './Form/Button'
import AlertMessage from './Form/AlertMessage'

const EntityModal = ({
  handleCreate,
  isDisabled,
  onSubmit,
  onReset,
  children,
  title = "Gestion de l'entité",
  errorUnique,
}) => {
  const { isModalOpen, closeModal, op } = useUIStore()

  return (
    <>
      <CButton
        size="sm"
        color="primary"
        variant="outline"
        className="rounded-pill"
        onClick={handleCreate}
      >
        <CIcon icon={cilPlus} />
      </CButton>

      <CModal
        backdrop="static"
        visible={isModalOpen}
        onClose={() => {
          closeModal()
          onReset()
        }}
        aria-labelledby="EntityModalLabel"
      >
        <CModalHeader>
          <CModalTitle id="EntityModalLabel">{title}</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {children}

          {errorUnique && <AlertMessage message={errorUnique} color="danger" />}
        </CModalBody>

        <CModalFooter className="d-flex gap-1">
          {op === 'delete' ? (
            <Button
              label="Supprimer"
              color="danger"
              onClick={onSubmit}
              disabled={isDisabled}
              loading={isDisabled}
            />
          ) : (
            <Button
              label="Sauvegarder"
              color="success"
              onClick={onSubmit}
              disabled={isDisabled}
              loading={isDisabled}
            />
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EntityModal
