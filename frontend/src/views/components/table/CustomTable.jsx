// ============================================================================
// 🔹 src/views/components/table/CustomTable.jsx
// Description : Tableau réutilisable basé sur TanStack React Table + CoreUI.
// Objectif : améliorer la responsivité, supprimer les retours à la ligne,
//             et garder un UI/UX propre et homogène.
// ============================================================================

import React from 'react'
import {
  CButton,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSortAlphaDown, cilSortAlphaUp, cilCloudDownload } from '@coreui/icons'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import ColumnFilter from './ColumnFilter'
import CustomTablePagination from './CustomTablePagination'
import { DEFAULT_PER_PAGE } from '../../../utils/constantes'
import { NavLink } from 'react-router-dom'

// ============================================================================
// 🔸 Composant principal : CustomTable
// ============================================================================
const CustomTable = ({ data, columns, url = 'users' }) => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnFilters, setColumnFilters] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: DEFAULT_PER_PAGE,
  })

  // 🔹 Initialisation du tableau avec TanStack
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, columnFilters, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)).toLowerCase().includes(String(filterValue).toLowerCase()),
  })

  // ========================================================================
  // 📦 Export des données visibles en fichier Excel (.xlsx)
  // ========================================================================
  const handleExportXLSX = () => {
    const rows = table.getRowModel().rows.map((row) => {
      const obj = {}
      row.getVisibleCells().forEach((cell) => {
        const header = cell.column.columnDef.header
        obj[typeof header === 'string' ? header : cell.column.id] = cell.getValue()
      })
      return obj
    })

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Données')

    const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([xlsxData], { type: 'application/octet-stream' })
    saveAs(blob, `export_${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  // ========================================================================
  // 🎨 Style et comportement responsive
  //  - Pas de retour à la ligne (white-space: nowrap)
  //  - Colonnes auto-ajustées à leur contenu (width: auto)
  //  - Scroll horizontal doux si dépassement
  // ========================================================================
  return (
    <div className="w-100">
      {/* 🔍 Barre de recherche + Export */}
      <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <CFormInput
          type="search"
          placeholder="Rechercher..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ maxWidth: '300px' }}
          size="sm"
        />
        <CButton size="sm" color="success" variant="outline" onClick={handleExportXLSX}>
          <CIcon icon={cilCloudDownload} className="me-2" />
          Exporter en XLSX
        </CButton>
      </div>

      {/* 🔽 Pagination au-dessus pour accès rapide */}
      <CustomTablePagination table={table} />

      {/* 🧩 Table principale */}
      <div
        className="table-responsive"
        style={{
          overflowX: 'auto',
          whiteSpace: 'nowrap', // ✅ empêche le retour à la ligne
          scrollbarWidth: 'thin',
        }}
      >
        <CTable hover striped small bordered align="middle">
          {/* En-têtes */}
          <CTableHead className="align-middle">
            {table.getHeaderGroups().map((headerGroup) => (
              <CTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <CTableHeaderCell
                    key={header.id}
                    style={{
                      verticalAlign: 'middle',
                      whiteSpace: 'nowrap',
                      width: 'auto', // ✅ largeur auto
                      cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    }}
                    className="text-nowrap"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {!header.isPlaceholder && (
                      <>
                        <div className="d-flex align-items-center justify-content-between gap-1">
                          {/* 🔹 Nom de la colonne */}
                          {flexRender(header.column.columnDef.header, header.getContext())}

                          {/* 🔹 Icônes de tri */}
                          {{
                            asc: <CIcon icon={cilSortAlphaDown} className="text-success" />,
                            desc: <CIcon icon={cilSortAlphaUp} className="text-primary" />,
                          }[header.column.getIsSorted()] ?? null}
                        </div>

                        {/* 🔹 Filtres de colonnes si disponibles */}
                        {header.column.getCanFilter() && (
                          <ColumnFilter column={header.column} table={table} />
                        )}
                      </>
                    )}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            ))}
          </CTableHead>

          {/* Corps du tableau */}
          <CTableBody>
            {table.getRowModel().rows.map((row) => (
              <CTableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <CTableDataCell
                    key={cell.id}
                    className="align-middle text-nowrap" // ✅ empêche les retours à la ligne
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '250px', // ✅ limite visuelle sans casser le layout
                    }}
                  >
                    <NavLink
                      to={`/${url}/${row.original.id}`}
                      className="nav-link text-decoration-none p-0"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </NavLink>
                  </CTableDataCell>
                ))}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      {/* 🔽 Pagination bas */}
      <div className="mt-2">
        <CustomTablePagination table={table} />
      </div>
    </div>
  )
}

export default CustomTable
