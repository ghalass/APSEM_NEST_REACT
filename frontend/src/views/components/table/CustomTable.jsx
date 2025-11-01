import React from 'react'
import {
  CButton,
  CFormInput,
  CNavLink,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPenNib,
  cilSortAlphaDown,
  cilSortAlphaUp,
  cilTrash,
  cilCloudDownload,
} from '@coreui/icons'
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

const CustomTable = ({ data, columns }) => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnFilters, setColumnFilters] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: DEFAULT_PER_PAGE,
  })

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

  // 🔽 Export visible data to Excel
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

  return (
    <div className="">
      {/* 🔍 Barre de recherche + Export */}
      <div className="mb-2 d-flex justify-content-between align-items-center flex-wrap gap-2">
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

      {/* Pagination */}
      <CustomTablePagination table={table} />

      {/* Table */}
      <CTable responsive="md" striped hover small>
        <CTableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <CTableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <CTableHeaderCell key={header.id}>
                  {!header.isPlaceholder && (
                    <>
                      <div
                        className={`d-flex align-items-center gap-1 ${
                          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <CIcon icon={cilSortAlphaDown} className="ms-1 text-success" />,
                          desc: <CIcon icon={cilSortAlphaUp} className="ms-1 text-primary" />,
                        }[header.column.getIsSorted()] ?? null}
                      </div>
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

        <CTableBody>
          {table.getRowModel().rows.map((row) => (
            <CTableRow key={row.id}>
              {/* Données */}
              {row.getVisibleCells().map((cell) => (
                <CTableDataCell key={cell.id} className="align-middle">
                  <NavLink
                    to={`/users/${row.original.id}`}
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
  )
}

export default CustomTable
