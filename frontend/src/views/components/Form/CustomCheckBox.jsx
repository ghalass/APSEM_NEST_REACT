// ✅ CustomCheckBox.jsx
import { cilBellExclamation } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormCheck } from '@coreui/react'
import { useField } from 'formik'

const CustomCheckBox = ({
  label = 'checkbox',
  feedbackInvalidMessage = 'You must agree before submitting.',
  ...props
}) => {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' }) // ✅ type explicite

  return (
    <>
      <CFormCheck
        type="checkbox"
        label={label}
        id={props.id || props.name}
        checked={field.value} // ✅ important
        onChange={(e) => helpers.setValue(e.target.checked)} // ✅ met à jour la valeur booléenne
        onBlur={field.onBlur}
        className="mt-3"
        invalid={meta.touched && !!meta.error}
        feedbackInvalid={
          <small className="d-flex gap-1 mt-1 align-items-center">
            <CIcon icon={cilBellExclamation} />
            {feedbackInvalidMessage}
          </small>
        }
      />
    </>
  )
}

export default CustomCheckBox
