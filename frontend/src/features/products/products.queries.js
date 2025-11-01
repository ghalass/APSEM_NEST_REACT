// src/features/users/users.queries.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as productsApi from './products.api'

const PRODUCTS_KEY = ['productsList']

// --- Queries ---
export const useProductsQuery = () =>
  useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: productsApi.getProducts,
  })

export const useProductsCartQuery = (query, options = {}) =>
  useQuery({
    queryKey: ['productsCart', query],
    queryFn: async () => {
      if (!query) return null // ✅ éviter undefined
      return await productsApi.getCartProducts(query)
    },
    enabled: options.enabled ?? !!query,
    ...options,
  })

// // --- Mutations ---
// export const useCreateUserMutation = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: usersApi.createUser,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
//   })
// }

// export const useUpdateUserMutation = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: usersApi.updateUser,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
//   })
// }

// export const useDeleteUserMutation = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: (user) => usersApi.deleteUser(user.id),
//     onMutate: async (user) => {
//       await queryClient.cancelQueries({ queryKey: USERS_KEY })
//       const previousUsers = queryClient.getQueryData(USERS_KEY)
//       queryClient.setQueryData(USERS_KEY, (old) => old?.filter((u) => u.id !== user.id))
//       return { previousUsers }
//     },
//     onError: (_err, _user, ctx) => {
//       queryClient.setQueryData(USERS_KEY, ctx.previousUsers)
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: USERS_KEY })
//     },
//   })
// }

// // --- Auth ---
// export const useLoginMutation = () =>
//   useMutation({
//     mutationFn: usersApi.login,
//     onSuccess: (res) => {
//       console.log(res)
//     },
//     onError: (_err, _user, ctx) => {
//       //
//     },
//   })

// export const useLogoutMutation = () =>
//   useMutation({
//     mutationFn: usersApi.logout,
//   })
