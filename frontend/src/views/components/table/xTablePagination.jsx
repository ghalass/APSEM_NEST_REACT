// components/table/TablePagination.jsx
import { CPagination, CPaginationItem } from '@coreui/react'
import { getMultiplesOf } from '../../../utils/func'
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../../utils/constantes'

const TablePagination = ({
  entitysPerPage,
  setEntitysPerPage,
  setCurrentPage,
  filteredEntitysLength,
  currentPage,
  handlePageChange,
  totalPages,
}) => {
  return (
    <div className="d-flex gap-2 justify-content-end">
      <div style={{ width: '50px' }}>
        <select
          className="form-control form-control-sm"
          defaultValue={entitysPerPage}
          onChange={(e) => {
            setEntitysPerPage(e.target.value)
            setCurrentPage(DEFAULT_PAGE)
          }}
        >
          {getMultiplesOf(filteredEntitysLength, DEFAULT_PER_PAGE)?.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/*  */}
      <div>
        <CPagination size="sm" aria-label="Page navigation example" className="mb-0">
          <CPaginationItem
            aria-label="Previous"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <CPaginationItem
              key={index}
              active={index + 1 === currentPage}
              size="sm"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </CPaginationItem>
          ))}

          <CPaginationItem
            aria-label="Next"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      </div>
    </div>
  )
}

export default TablePagination
