import React from 'react'
import {
  CPagination,
  CPaginationItem,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'
import { getMultiplesOf } from '../../../utils/func'
import { DEFAULT_PER_PAGE } from '../../../utils/constantes'

const CustomTablePagination = ({ table }) => {
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()

  return (
    <div className="mb-2">
      <CRow className="align-items-center g-3">
        {/* Left side: pagination controls */}
        <CCol xs="12" md="6">
          <CPagination align="start" className="mb-0" size="sm">
            <CPaginationItem
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
            >
              «
            </CPaginationItem>
            <CPaginationItem
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              ‹
            </CPaginationItem>
            <CPaginationItem active>
              {pageIndex + 1} / {pageCount || 1}
            </CPaginationItem>
            <CPaginationItem disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
              ›
            </CPaginationItem>
            <CPaginationItem
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(pageCount - 1)}
            >
              »
            </CPaginationItem>
          </CPagination>
        </CCol>

        {/* Right side: go to page + page size */}
        <CCol
          xs="12"
          md="6"
          className="d-flex justify-content-md-end align-items-center gap-2 flex-wrap"
        >
          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold">Aller à la page:</span>
            <CFormInput
              type="number"
              size="sm"
              min={1}
              max={pageCount}
              value={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              style={{ width: '70px' }}
            />
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold">Afficher:</span>
            <CFormSelect
              size="sm"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              style={{ width: '100px' }}
            >
              <option value="">Affficher tout</option>
              <option value="">--------------</option>
              {getMultiplesOf(table.getRowCount(), DEFAULT_PER_PAGE).map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} / page
                </option>
              ))}
            </CFormSelect>
          </div>

          <CButton size="sm" color="secondary" variant="outline" className="text-nowrap" disabled>
            {table.getRowModel().rows.length} / {table.getRowCount()} lignes
          </CButton>
        </CCol>
      </CRow>
    </div>
  )
}

export default CustomTablePagination
