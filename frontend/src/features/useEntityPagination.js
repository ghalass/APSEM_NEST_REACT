// src/hooks/useEntityPagination.js
import { useMemo, useState } from 'react'
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../utils/constantes'

/**
 * Hook pour gérer recherche et pagination
 * @param {Array} data - tableau de données
 * @param {number} defaultPerPage - nombre par page
 */
const useEntityPagination = (data = [], defaultPerPage = DEFAULT_PER_PAGE) => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [entitysPerPage, setEntitysPerPage] = useState(defaultPerPage)

  // 🔍 Filtrage

  const filteredEntitys = useMemo(() => {
    if (!data) return []
    return data.filter(
      (el) =>
        el.name?.toLowerCase().includes(search.toLowerCase()) ||
        el.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        el.email?.toLowerCase().includes(search.toLowerCase()) ||
        el.role?.toLowerCase().includes(search.toLowerCase()),
    )
  }, [data, search])

  // 📄 Pagination
  const currentEntitys = useMemo(() => {
    const indexOfLastEntity = currentPage * entitysPerPage
    const indexOfFirstEntity = indexOfLastEntity - entitysPerPage
    return filteredEntitys.slice(indexOfFirstEntity, indexOfLastEntity)
  }, [filteredEntitys, currentPage, entitysPerPage])

  const totalPages = useMemo(
    () => Math.ceil(filteredEntitys.length / entitysPerPage),
    [filteredEntitys, entitysPerPage],
  )

  return {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    entitysPerPage,
    setEntitysPerPage,
    filteredEntitys,
    currentEntitys,
    totalPages,
  }
}

export default useEntityPagination
