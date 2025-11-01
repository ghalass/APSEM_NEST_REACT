// src/features/users/users.queries.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as usersApi from './users.api'

const USERS_KEY = ['usersList']

// --- Queries ---
export const useUsersQuery = () =>
  useQuery({
    queryKey: USERS_KEY,
    queryFn: usersApi.getUsers,
  })

export const useUserQuery = (id) =>
  useQuery({
    queryKey: [...USERS_KEY, id], // clé unique par utilisateur
    queryFn: () => usersApi.getUser(id), // on passe l'id ici
    enabled: !!id, // ne pas exécuter si id est undefined
  })

// --- Mutations ---
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  })
}

export const useUpdateUserMutation = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersApi.updateUser,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY })
      if (onSuccess) onSuccess(data, variables, context) // callback du composant
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context) // callback du composant
    },
  })
}

export const useDeleteUserMutation = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => usersApi.deleteUser(id), // on accepte directement l'id
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY })
      if (onSuccess) onSuccess(data, variables, context)
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context)
    },
  })
}

// --- Auth ---
export const useLoginMutation = () =>
  useMutation({
    mutationFn: usersApi.login,
    onSuccess: (res) => {
      // console.log(res)
    },
    onError: (_err, _user, ctx) => {
      //
    },
  })

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: usersApi.logout,
  })
