import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CAlert,
  CSpinner,
} from '@coreui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomInput from '../components/Form/CustomInput'
import CustomSelect from '../components/Form/CustomSelect'
import CustomCheckBox from '../components/Form/CustomCheckBox'
import { cilUser, cilLockLocked, cilBellExclamation } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify'
import { USER_TYPE } from '../../utils/types'

// 🔹 API : création utilisateur
const addUser = async (data) => {
  const res = await fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Erreur lors de la création')
  return json
}

// 🔹 Validation Yup
const AddUserSchema = Yup.object().shape({
  firstName: Yup.string().required('Le prénom est requis'),
  lastName: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('Email invalide').required('L’email est requis'),
  password: Yup.string().min(6, 'Minimum 6 caractères').required('Mot de passe requis'),
  role: Yup.string().required('Rôle requis'),
  active: Yup.boolean(),
})

const AddUserModal = ({ visible, onClose }) => {
  const queryClient = useQueryClient()
  const [serverErrors, setServerErrors] = useState(null)

  const createMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']) // revalide la liste
      toast.success('Utilisateur créé avec succès !')
      setServerErrors(null)
      onClose()
    },
    onError: (err) => setServerErrors(err.message || 'Erreur serveur'),
  })

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'USER',
    active: true,
  }

  return (
    <CModal visible={visible} onClose={onClose} backdrop="static">
      <CModalHeader>Ajouter un nouvel utilisateur</CModalHeader>
      <CModalBody>
        {serverErrors && (
          <CAlert color="danger">
            <CIcon icon={cilBellExclamation} className="me-1" />
            {serverErrors}
          </CAlert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={AddUserSchema}
          onSubmit={(values, actions) => {
            createMutation.mutate(values)
            actions.setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <CustomInput
                name="firstName"
                placeholder="Prénom"
                icon={cilUser}
                disabled={isSubmitting || createMutation.isPending}
              />
              <CustomInput
                name="lastName"
                placeholder="Nom"
                icon={cilUser}
                disabled={isSubmitting || createMutation.isPending}
              />
              <CustomInput
                name="email"
                type="email"
                placeholder="Email"
                icon={cilUser}
                disabled={isSubmitting || createMutation.isPending}
              />
              <CustomInput
                name="password"
                type="password"
                placeholder="Mot de passe"
                icon={cilLockLocked}
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomSelect
                name="role"
                label="Rôle"
                options={USER_TYPE.map((item) => ({
                  label: item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase(), // formatage optionnel
                  value: item.value,
                }))}
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomCheckBox
                name="active"
                label="Actif"
                disabled={isSubmitting || createMutation.isPending}
              />

              <CModalFooter className="justify-content-end mt-3">
                <CButton color="secondary" onClick={onClose} disabled={isSubmitting}>
                  Annuler
                </CButton>
                <CButton
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || createMutation.isPending}
                >
                  {isSubmitting || createMutation.isPending ? <CSpinner size="sm" /> : 'Créer'}
                </CButton>
              </CModalFooter>
            </Form>
          )}
        </Formik>
      </CModalBody>
    </CModal>
  )
}

export default AddUserModal
