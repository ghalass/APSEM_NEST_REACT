// ============================================================================
// 🔹 AddBacklogModal.jsx
// Description : Modal pour ajouter une nouvelle anomalie au backlog
// Inspiré de AddUserModal pour cohérence UI/UX et gestion via Formik/Yup
// ============================================================================

import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
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
import { cilBellExclamation } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// 🔹 Options pour select (source, urgence, status)
const SOURCE_OPTIONS = [
  { label: 'VS', value: 'VS' },
  { label: 'VJ', value: 'VJ' },
  { label: 'INSPECTION', value: 'INSPECTION' },
]

const URGENCE_OPTIONS = [
  { label: 'Très élevée', value: 'TRES_ELEVEE' },
  { label: 'Élevée', value: 'ELEVEE' },
  { label: 'Moyenne', value: 'MOYENNE' },
  { label: 'Faible', value: 'FAIBLE' },
]

const STATUS_OPTIONS = [
  { label: 'Non programmée', value: 'NON_PROGRAMMEE' },
  { label: 'Programmee', value: 'PROGRAMMEE' },
  { label: 'PDR prêt', value: 'PDR_PRET' },
  { label: 'Attente PDR', value: 'ATTENTE_PDR' },
  { label: 'Exécutée', value: 'EXECUTE' },
]

// 🔹 API : création anomalie
const addAnomalie = async (data) => {
  const res = await fetch('http://localhost:3000/anomalie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Erreur lors de la création de l’anomalie')
  return json
}

// 🔹 Validation Yup pour le formulaire
const AddBacklogSchema = Yup.object().shape({
  siteId: Yup.string().required('Le site est requis'),
  enginId: Yup.string().required('L’engin est requis'),
  typepanneId: Yup.string().required('Le type de panne est requis'),
  date_anomalie: Yup.date().required('La date de l’anomalie est requise'),
  description: Yup.string().required('La description est requise'),
  source: Yup.string().required('La source est requise'),
  urgence: Yup.string().required('L’urgence est requise'),
  equipe_execution: Yup.string(),
  status: Yup.string().required('Le status est requis'),
  date_execution: Yup.date(),
  obs: Yup.string(),
})

const AddBacklogModal = ({ visible, onClose, onSaved }) => {
  const queryClient = useQueryClient()
  const [serverErrors, setServerErrors] = useState(null)

  // 🧩 Données de référence : sites, engins, types de panne
  const [sites, setSites] = useState([])
  const [engins, setEngins] = useState([])
  const [typesPanne, setTypesPanne] = useState([])

  // 🔄 Charger les données quand modal visible
  useEffect(() => {
    if (visible) {
      Promise.all([
        fetch('http://localhost:3000/site').then((r) => r.json()),
        fetch('http://localhost:3000/engin').then((r) => r.json()),
        fetch('http://localhost:3000/typepanne').then((r) => r.json()),
      ])
        .then(([sitesData, enginsData, typesPanneData]) => {
          setSites(sitesData)
          setEngins(enginsData)
          setTypesPanne(typesPanneData)
        })
        .catch(() => setServerErrors('Impossible de charger les données de référence'))
    }
  }, [visible])

  // 🔹 Mutation React Query
  const createMutation = useMutation({
    mutationFn: addAnomalie,
    onSuccess: () => {
      queryClient.invalidateQueries(['anomalies'])
      setServerErrors(null)
      onSaved?.()
      onClose()
    },
    onError: (err) => setServerErrors(err.message || 'Erreur serveur'),
  })

  // 🔹 Valeurs initiales
  const initialValues = {
    siteId: '',
    enginId: '',
    typepanneId: '',
    date_anomalie: '',
    description: '',
    source: 'VS',
    urgence: 'MOYENNE',
    equipe_execution: '',
    status: 'NON_PROGRAMMEE',
    date_execution: '',
    obs: '',
  }

  return (
    <CModal visible={visible} onClose={onClose} backdrop="static" size="lg" alignment="center">
      <CModalHeader closeButton>
        <CModalTitle>➕ Ajouter une anomalie</CModalTitle>
      </CModalHeader>

      <CModalBody>
        {/* ❌ Affichage erreurs serveur */}
        {serverErrors && (
          <CAlert color="danger" className="text-center">
            <CIcon icon={cilBellExclamation} className="me-1" />
            {serverErrors}
          </CAlert>
        )}

        {/* 🔹 Formulaire Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={AddBacklogSchema}
          onSubmit={(values, actions) => {
            createMutation.mutate(values)
            actions.setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              {/* ✅ Sélections et inputs */}
              <CustomSelect
                name="siteId"
                label="Site"
                options={sites.map((s) => ({ label: s.name, value: s.id }))}
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomSelect
                name="enginId"
                label="Engin"
                options={engins.map((e) => ({ label: e.name, value: e.id }))}
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomSelect
                name="typepanneId"
                label="Type de panne"
                options={typesPanne.map((t) => ({ label: t.name, value: t.id }))}
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomInput
                name="date_anomalie"
                type="date"
                label="Date de l’anomalie"
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomInput
                name="description"
                label="Description"
                placeholder="Décrire brièvement l’anomalie"
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomSelect
                name="source"
                label="Source"
                options={SOURCE_OPTIONS}
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomSelect
                name="urgence"
                label="Urgence"
                options={URGENCE_OPTIONS}
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomInput
                name="equipe_execution"
                label="Équipe d’exécution (optionnel)"
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomSelect
                name="status"
                label="Status"
                options={STATUS_OPTIONS}
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomInput
                name="date_execution"
                type="date"
                label="Date d’exécution (optionnel)"
                disabled={isSubmitting || createMutation.isPending}
              />

              <CustomInput
                name="obs"
                label="Observation (optionnel)"
                placeholder="Remarques supplémentaires"
                disabled={isSubmitting || createMutation.isPending}
              />

              {/* Footer */}
              <CModalFooter className="justify-content-end mt-3">
                <CButton color="secondary" onClick={onClose} disabled={isSubmitting}>
                  Annuler
                </CButton>
                <CButton
                  color="success"
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

export default AddBacklogModal
