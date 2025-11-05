import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
import { toast } from 'react-toastify'
import { cilBellExclamation } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// ========================
// 🔹 Options fixes pour select
// ========================
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

// ========================
// 🔹 Validation Formik/Yup pour modal édition anomalie
// ========================
const EditAnomalieSchema = Yup.object().shape({
  siteId: Yup.string().required('Le site est requis'),
  enginId: Yup.string().required('L’engin est requis'),
  typepanneId: Yup.string().required('Le type de panne est requis'),
  date_anomalie: Yup.date().required('La date de l’anomalie est requise'),
  description: Yup.string().required('La description est requise'),
  source: Yup.string().required('La source est requise'),
  urgence: Yup.string().required('L’urgence est requise'),
  status: Yup.string().required('Le status est requis'),
  equipe_execution: Yup.string(),
  date_execution: Yup.date(),
  obs: Yup.string(),
})

// ========================
// 🔹 API fetchers et mutations
// ========================
const fetchBacklog = async (id) => {
  const res = await fetch(`http://localhost:3000/anomalie/${id}`)
  if (!res.ok) throw new Error('Erreur lors du chargement du backlog')
  return res.json()
}

const fetchSites = async () => {
  const res = await fetch('http://localhost:3000/site')
  if (!res.ok) throw new Error('Erreur sites')
  return res.json()
}

const fetchEngins = async () => {
  const res = await fetch('http://localhost:3000/engin')
  if (!res.ok) throw new Error('Erreur engins')
  return res.json()
}

const fetchTypesPanne = async () => {
  const res = await fetch('http://localhost:3000/typepanne')
  if (!res.ok) throw new Error('Erreur types de panne')
  return res.json()
}

const updateAnomalie = async ({ id, ...data }) => {
  const res = await fetch(`http://localhost:3000/anomalie/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Erreur lors de la mise à jour')
  return json
}

const deleteAnomalie = async (id) => {
  const res = await fetch(`http://localhost:3000/anomalie/${id}`, { method: 'DELETE' })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Erreur lors de la suppression')
  return json
}

// ========================
// 📄 Component principal
// ========================
const BacklogDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // ------------------------
  // ⚡️ State pour UI et modals
  // ------------------------
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [serverErrors, setServerErrors] = useState(null)
  const [sites, setSites] = useState([])
  const [engins, setEngins] = useState([])
  const [typesPanne, setTypesPanne] = useState([])

  // ------------------------
  // 🔹 Fetch backlog
  // ------------------------
  const {
    data: backlog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['backlog', id],
    queryFn: () => fetchBacklog(id),
  })

  // ------------------------
  // 🔹 Fetch données pour le modal
  // ------------------------
  const { data: sitesData } = useQuery({ queryKey: ['sites'], queryFn: fetchSites })
  const { data: enginsData } = useQuery({ queryKey: ['engins'], queryFn: fetchEngins })
  const { data: typesPanneData } = useQuery({ queryKey: ['typesPanne'], queryFn: fetchTypesPanne })

  // ------------------------
  // 🔹 Mettre à jour les states une fois les données fetchées
  // ------------------------
  useEffect(() => {
    if (sitesData) setSites(sitesData)
    if (enginsData) setEngins(enginsData)
    if (typesPanneData) setTypesPanne(typesPanneData)
  }, [sitesData, enginsData, typesPanneData])

  // ------------------------
  // 🔹 Mutations
  // ------------------------
  const updateMutation = useMutation({
    mutationFn: updateAnomalie,
    onSuccess: () => {
      toast.success('Anomalie mise à jour')
      queryClient.invalidateQueries({ queryKey: ['backlog', id] })
      setShowEditModal(false)
      setServerErrors(null)
    },
    onError: (err) => setServerErrors(err.message || 'Erreur serveur'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAnomalie,
    onSuccess: () => {
      toast.success('Anomalie supprimée')
      navigate(-1)
    },
    onError: (err) => setServerErrors(err.message || 'Erreur serveur'),
  })

  // ------------------------
  // ⚡️ Loading & erreurs
  // ------------------------
  if (isLoading) {
    return (
      <CContainer className="py-5 text-center">
        <CSpinner color="primary" variant="grow" />
        <p className="mt-3">Chargement des données...</p>
      </CContainer>
    )
  }

  if (isError || !backlog) {
    return (
      <CContainer className="py-5">
        <CAlert color="danger" className="text-center">
          {error?.message || 'Backlog non trouvé'}
        </CAlert>
        <div className="text-center">
          <CButton color="secondary" onClick={() => navigate(-1)}>
            Retour
          </CButton>
        </div>
      </CContainer>
    )
  }

  // ========================
  // 🔹 JSX principal
  // ========================
  return (
    <CContainer className="py-4">
      {/* ---------------------- */}
      {/* Header avec actions */}
      {/* ---------------------- */}
      <CRow className="mb-3">
        <CCol className="d-flex justify-content-between align-items-center flex-wrap">
          <h3>Détails du backlog</h3>
          <div className="d-flex gap-2 flex-wrap">
            <CButton color="secondary" size="sm" onClick={() => navigate(-1)}>
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
        </CCol>
      </CRow>

      {/* ---------------------- */}
      {/* Informations backlog */}
      {/* ---------------------- */}
      <CRow className="justify-content-center">
        <CCol md={10}>
          <CCard className="shadow-sm border-0">
            <CCardHeader className="bg-primary text-white">Informations de l’anomalie</CCardHeader>
            <CCardBody>
              {serverErrors && (
                <CAlert color="danger" className="mb-3">
                  <CIcon icon={cilBellExclamation} className="me-1" />
                  {serverErrors}
                </CAlert>
              )}
              <p>
                <strong>ID :</strong> {backlog.id}
              </p>
              <p>
                <strong>Site :</strong> {backlog.site.name}
              </p>
              <p>
                <strong>Engin :</strong> {backlog.engin.name}
              </p>
              <p>
                <strong>Type de panne :</strong> {backlog.typepanne.name}
              </p>
              <p>
                <strong>Date anomalie :</strong>{' '}
                {new Date(backlog.date_anomalie).toLocaleDateString('fr-FR')}
              </p>
              <p>
                <strong>Description :</strong> {backlog.description}
              </p>
              <p>
                <strong>Source :</strong> {backlog.source}
              </p>
              <p>
                <strong>Urgence :</strong> {backlog.urgence}
              </p>
              <p>
                <strong>Status :</strong>{' '}
                <CBadge
                  color={
                    backlog.status === 'EXECUTE'
                      ? 'success'
                      : backlog.status === 'NON_PROGRAMMEE'
                        ? 'secondary'
                        : 'warning'
                  }
                >
                  {backlog.status}
                </CBadge>
              </p>
              <p>
                <strong>Date d'exécution :</strong>{' '}
                {new Date(backlog.date_execution).toLocaleDateString('fr-FR')}
              </p>
              <p></p>
              {backlog.equipe_execution && (
                <p>
                  <strong>Équipe :</strong> {backlog.equipe_execution}
                </p>
              )}
              {backlog.obs && (
                <p>
                  <strong>Observation :</strong> {backlog.obs}
                </p>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* ---------------------- */}
      {/* Modal Édition anomalie */}
      {/* ---------------------- */}
      <CModal
        backdrop="static"
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        size="lg"
      >
        <CModalHeader>Modifier l’anomalie</CModalHeader>
        <CModalBody>
          {serverErrors && (
            <CAlert color="danger" className="mb-3 text-center">
              <CIcon icon={cilBellExclamation} className="me-1" />
              {serverErrors}
            </CAlert>
          )}
          <Formik
            enableReinitialize={true} // 🔹 Assure que les champs sont préremplis
            initialValues={{
              siteId: backlog.site.id,
              enginId: backlog.engin.id,
              typepanneId: backlog.typepanne.id,
              date_anomalie: backlog.date_anomalie.split('T')[0],
              description: backlog.description,
              source: backlog.source,
              urgence: backlog.urgence,
              equipe_execution: backlog.equipe_execution || '',
              status: backlog.status,
              date_execution: backlog.date_execution ? backlog.date_execution.split('T')[0] : '',
              obs: backlog.obs || '',
            }}
            validationSchema={EditAnomalieSchema}
            onSubmit={(values, actions) => {
              updateMutation.mutate({ id, ...values })
              actions.setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                {/* 🔹 Champs préchargés avec les données fetchées */}
                <CustomSelect
                  name="siteId"
                  label="Site"
                  options={sites.map((s) => ({ label: s.name, value: s.id }))}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomSelect
                  name="enginId"
                  label="Engin"
                  options={engins.map((e) => ({ label: e.name, value: e.id }))}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomSelect
                  name="typepanneId"
                  label="Type de panne"
                  options={typesPanne.map((t) => ({ label: t.name, value: t.id }))}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomInput
                  name="date_anomalie"
                  type="date"
                  label="Date de l’anomalie"
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomInput
                  name="description"
                  label="Description"
                  placeholder="Décrire l’anomalie"
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomSelect
                  name="source"
                  label="Source"
                  options={SOURCE_OPTIONS}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomSelect
                  name="urgence"
                  label="Urgence"
                  options={URGENCE_OPTIONS}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomInput
                  name="equipe_execution"
                  label="Équipe d’exécution (optionnel)"
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomSelect
                  name="status"
                  label="Status"
                  options={STATUS_OPTIONS}
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomInput
                  name="date_execution"
                  type="date"
                  label="Date d’exécution (optionnel)"
                  disabled={isSubmitting || updateMutation.isPending}
                />
                <CustomInput
                  name="obs"
                  label="Observation (optionnel)"
                  disabled={isSubmitting || updateMutation.isPending}
                />

                {/* ---------------------- */}
                {/* Footer modal */}
                {/* ---------------------- */}
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

      {/* ---------------------- */}
      {/* Modal Suppression anomalie */}
      {/* ---------------------- */}
      <CModal backdrop="static" visible={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <CModalHeader>Confirmer la suppression</CModalHeader>
        <CModalBody>
          <p>
            Voulez-vous vraiment supprimer cette anomalie <strong>ID: {backlog.id}</strong> ?
          </p>
        </CModalBody>
        <CModalFooter className="justify-content-end">
          <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </CButton>
          <CButton
            color="danger"
            onClick={() => deleteMutation.mutate(backlog.id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Suppression...' : 'Supprimer'}
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default BacklogDetailsPage
