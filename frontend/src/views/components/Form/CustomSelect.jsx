import { cilBellExclamation, cilTextSize } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CFormSelect, CInputGroup, CInputGroupText } from '@coreui/react'
import { useField } from 'formik'

const CustomSelect = ({ icon = cilTextSize, ...props }) => {
  const [field, meta, helpers] = useField(props)
  return (
    <>
      <CInputGroup className="mt-3">
        <CInputGroupText>
          <CIcon icon={icon} />
        </CInputGroupText>
        <CFormSelect
          {...props}
          {...field}
          invalid={meta.error && meta.touched}
          size="md"
          aria-label="Large select example"
          feedback={
            meta.touched &&
            meta.error && (
              <small className="d-flex gap-1 mt-1 align-items-center">
                <CIcon icon={cilBellExclamation} />
                {meta.error}
              </small>
            )
          }
        ></CFormSelect>
      </CInputGroup>
    </>
  )
}

export default CustomSelect
