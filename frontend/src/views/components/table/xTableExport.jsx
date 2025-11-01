// components/table/TableExport.jsx
import { cilCloudDownload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import { exportExcel } from '../../../utils/func'

const TableExport = ({ tableId, excelFileName, filteredEntitys }) => {
  return (
    <CButton
      size="sm"
      color="success"
      variant="outline"
      onClick={() => exportExcel(tableId, excelFileName)}
      className="rounded-pill"
      disabled={!filteredEntitys || filteredEntitys.length === 0}
    >
      Excel <CIcon icon={cilCloudDownload} />
    </CButton>
  )
}

export default TableExport
