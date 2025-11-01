import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CRow,
  CCol,
  CSpinner,
  CAlert,
  CBadge,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomInput from '../components/Form/CustomInput'
import CustomSelect from '../components/Form/CustomSelect'
import CustomCheckBox from '../components/Form/CustomCheckBox'
import { toast } from 'react-toastify'
import { cilUser, cilBellExclamation } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUserQuery,
} from '../../features/users/users.queries'
import { USER_TYPE } from '../../utils/types'

// ------------------------------
// 🔹 Validation Formulaire
// ------------------------------
const EditUserSchema = Yup.object().shape({
  firstName: Yup.string().required('Le prénom est requis'),
  lastName: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('Email invalide').required('L’email est requis'),
  role: Yup.string().required('Rôle requis'),
  active: Yup.boolean(),
})

// ------------------------------
// 📄 Component
// ------------------------------
const UserDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [serverErrors, setServerErrors] = useState(null)

  // 🔄 GET USER via useUserQuery
  const { data: user, isLoading, isError, error } = useUserQuery(id)

  // ✏️ UPDATE USER
  const updateMutation = useUpdateUserMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['usersList'])
      toast.success('Utilisateur mis à jour')
      setShowEditModal(false)
      setServerErrors(null)
    },
    onError: (err) => setServerErrors(err.message),
  })

  // ❌ DELETE USER
  const deleteMutation = useDeleteUserMutation({
    onSuccess: () => {
      toast.success('Utilisateur supprimé')
      navigate('/users')
    },
    onError: (err) => setServerErrors(err.message),
  })

  if (isLoading) {
    return (
      <CContainer className="py-5 text-center">
        <CSpinner color="primary" variant="grow" />
        <p className="mt-3">Chargement des données...</p>
      </CContainer>
    )
  }

  if (isError || !user) {
    return (
      <CContainer className="py-5">
        <CAlert color="danger" className="text-center">
          {error?.message || 'Utilisateur non trouvé'}
        </CAlert>
        <div className="text-center">
          <CButton color="secondary" onClick={() => navigate(-1)}>
            Retour
          </CButton>
        </div>
      </CContainer>
    )
  }

  return (
    <CContainer className="py-4">
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard className="shadow-sm border-0">
            <CCardHeader className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Détails de l’utilisateur</h5>
              <div className="d-flex gap-2">
                <CButton color="light" size="sm" onClick={() => navigate(-1)}>
                  Retour
                </CButton>
                <CButton color="info" size="sm" onClick={() => setShowEditModal(true)}>
                  Modifier
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Suppression...' : 'Supprimer'}
                </CButton>
              </div>
            </CCardHeader>

            <CCardBody>
              {serverErrors && (
                <CAlert color="danger" className="mb-3">
                  <CIcon icon={cilBellExclamation} className="me-1" />
                  {serverErrors}
                </CAlert>
              )}
              <p>
                <strong>ID :</strong> {user.id}
              </p>
              <p>
                <strong>Nom :</strong> {user.lastName} {user.firstName}
              </p>
              <p>
                <strong>Email :</strong> {user.email}
              </p>
              <p>
                <strong>Rôle :</strong>{' '}
                <CBadge
                  color={
                    user.role === 'ADMIN'
                      ? 'primary'
                      : user.role === 'SUPER_ADMIN'
                        ? 'danger'
                        : 'secondary'
                  }
                >
                  {user.role}
                </CBadge>
              </p>
              <p>
                <strong>Statut :</strong>{' '}
                <CBadge color={user.active ? 'success' : 'danger'}>
                  {user.active ? 'Actif' : 'Inactif'}
                </CBadge>
              </p>
              <p>
                <strong>Créé le :</strong> {new Date(user.createdAt).toLocaleString()}
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* 🛠️ Modal Édition */}
      <CModal backdrop="static" visible={showEditModal} onClose={() => setShowEditModal(false)}>
        <CModalHeader>Modifier l’utilisateur</CModalHeader>
        <CModalBody>
          {serverErrors && (
            <CAlert color="danger" className="mb-3">
              <CIcon icon={cilBellExclamation} className="me-1" />
              {serverErrors}
            </CAlert>
          )}
          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              active: user.active,
            }}
            validationSchema={EditUserSchema}
            onSubmit={(values, actions) => {
              updateMutation.mutate({ id, ...values })
              actions.setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <CustomInput
                  name="lastName"
                  placeholder="Nom"
                  icon={cilUser}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomInput
                  name="firstName"
                  placeholder="Prénom"
                  icon={cilUser}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  icon={cilUser}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomSelect
                  name="role"
                  label="Rôle"
                  options={USER_TYPE.map((item) => ({
                    label: item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase(), // formatage optionnel
                    value: item.value,
                  }))}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomCheckBox
                  name="active"
                  label="Actif"
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CModalFooter className="justify-content-end mt-3">
                  <CButton color="secondary" onClick={() => setShowEditModal(false)}>
                    Annuler
                  </CButton>
                  <CButton
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || updateMutation.isPending}
                  >
                    {isSubmitting || updateMutation.isPending ? 'Sauvegarde...' : 'Enregistrer'}
                  </CButton>
                </CModalFooter>
              </Form>
            )}
          </Formik>
        </CModalBody>
      </CModal>

      {/* 🗑️ Modal Suppression */}
      <CModal backdrop="static" visible={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <CModalHeader>Confirmer la suppression</CModalHeader>
        <CModalBody>
          <p>
            Voulez-vous vraiment supprimer{' '}
            <strong>
              {user.firstName} {user.lastName}
            </strong>{' '}
            ?
          </p>
        </CModalBody>
        <CModalFooter className="justify-content-end">
          <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </CButton>
          <CButton
            color="danger"
            onClick={() => deleteMutation.mutate(user.id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Suppression...' : 'Supprimer'}
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default UserDetailsPage
