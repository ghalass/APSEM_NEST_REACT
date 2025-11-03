import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
  CAlert,
  CFormInput,
} from '@coreui/react'
import { useQuery } from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('date_anomalie', {
    header: 'Date anomalie',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('engin', {
    header: 'Engin',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('ref_bs', {
    header: 'Réf. BS',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('code_bs', {
    header: 'Code BS',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('no_bs', {
    header: 'N° BS',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('date_execution', {
    header: 'Date execution',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('source', {
    header: 'Source',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('urgence', {
    header: 'Urgence',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('equipe_execution', {
    header: 'Equipe execution',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('obs_anomalie', {
    header: 'Observations anomalie',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('type_panne', {
    header: 'Type panne',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('status', {
    header: 'Statut',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('besoin_status', {
    header: 'Statut besoin',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('obs_bs', {
    header: 'Observations BS',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
]

export default function BacklogPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['anomalies'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/anomalie/formatted`)
      if (!res.ok) throw new Error('Erreur réseau')
      return res.json()
    },
  })

  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data: data || [],
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <CCard>
      <CCardHeader>
        📋 Backlog des anomalies
        <div className="mt-2">
          <CFormInput
            placeholder="Recherche globale..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      </CCardHeader>
      <CCardBody>
        {isLoading && (
          <div className="text-center p-4">
            <CSpinner color="primary" />
          </div>
        )}

        {!isLoading && (!data || data.length === 0) && (
          <CAlert color="info" className="text-center">
            Aucune donnée disponible.
          </CAlert>
        )}

        {!isLoading && data && data.length > 0 && (
          <CTable hover bordered responsive>
            <CTableHead color="dark">
              {table.getHeaderGroups().map((headerGroup) => (
                <CTableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <CTableHeaderCell
                      key={header.id}
                      style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
                    >
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                      {header.column.getCanFilter() && (
                        <CFormInput
                          size="sm"
                          placeholder="Filtrer..."
                          value={header.column.getFilterValue() ?? ''}
                          onChange={(e) => header.column.setFilterValue(e.target.value)}
                        />
                      )}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              ))}
            </CTableHead>

            <CTableBody>
              {table.getRowModel().rows.map((row) => (
                <CTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <CTableDataCell key={cell.id} style={{ whiteSpace: 'nowrap' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </CTableDataCell>
                  ))}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  )
}
