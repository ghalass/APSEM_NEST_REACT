// src/hooks/useUsersPage.js
import { useCallback, useState } from 'react'
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from './users.queries' // ✅ on importe directement
import { toast } from 'react-toastify'
import parseApiErrors from '../../utils/parseApiErrors'
import useEntityPagination from '../useEntityPagination'
import useUIStore from '../../stores/store'

export const useUsersPage = () => {
  const { openModal, closeModal, op, setOp } = useUIStore()

  // Valeurs par défaut d’un utilisateur
  const initialVal = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    active: true,
    role: '',
  }

  const [entity, setEntity] = useState(initialVal)

  // ✅ Queries et mutations depuis users.queries.js
  const getAllQuery = useUsersQuery()
  const createMutation = useCreateUserMutation()
  const updateMutation = useUpdateUserMutation()
  const deleteMutation = useDeleteUserMutation()

  // Mutation courante selon op
  const currentMutation =
    op === 'create'
      ? createMutation
      : op === 'update'
        ? updateMutation
        : op === 'delete'
          ? deleteMutation
          : null

  const isDisabled = currentMutation?.isPending
  const errors = parseApiErrors(currentMutation?.error)
  const errorUnique = typeof errors === 'string' ? errors : null

  const messages = {
    create: 'Ajouté avec succès.',
    update: 'Modifié avec succès.',
    delete: 'Supprimé avec succès.',
  }

  // Hook pagination + recherche
  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    entitysPerPage,
    setEntitysPerPage,
    totalPages,
    filteredEntitys,
    currentEntitys,
  } = useEntityPagination(getAllQuery.data)

  // Réinitialisation
  const handleResetAll = () => {
    setEntity(initialVal)
    currentMutation?.reset?.() // ✅ éviter undefined si pas de mutation
    setOp('create')
  }

  // Handlers
  const handleEdit = useCallback((user) => {
    setEntity(user)
    setOp('update')
    openModal()
  }, [])

  const handleDelete = useCallback((user) => {
    setEntity(user)
    setOp('delete')
    openModal()
  }, [])

  const handleCreate = useCallback(() => {
    setEntity(initialVal)
    setOp('create')
    openModal()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    currentMutation.mutate(entity, {
      onSuccess: () => {
        closeModal()
        handleResetAll()
        toast.success(messages[op])
      },
    })
  }

  return {
    entity,
    setEntity,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    entitysPerPage,
    setEntitysPerPage,
    totalPages,
    filteredEntitys,
    currentEntitys,
    getAllQuery,
    isDisabled,
    errors,
    errorUnique,
    handleResetAll,
    handleEdit,
    handleDelete,
    handleCreate,
    handleSubmit,
    op,
  }
}
