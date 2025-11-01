// components/table/TableTitle.jsx
import { CBadge, CSpinner } from '@coreui/react'

/**
 *
 *
 * @param {*} props {title, listLength, isDisabled}
 * @return {*}
 */
const TableTitle = (props) => {
  return (
    <div className="d-flex align-items-center gap-1 text-uppercase">
      <span>{props.title}</span>
      <div>
        <CBadge textBgColor="primary"> {props.listLength || 0}</CBadge>
      </div>
      {props.isDisabled && <CSpinner color="primary" size="sm" />}
    </div>
  )
}

export default TableTitle
