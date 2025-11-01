import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CFormSelect,
  CHeaderNav,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBellExclamation, cilLockLocked, cilSchool, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/users/users.queries'
import { useAuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import ChangeLang from './components/ChangeLang'
import ChangeTheme from './components/ChangeTheme'
import { toast } from 'react-toastify'
import i18next from 'i18next'
import { Form, Formik } from 'formik'
import loginSchema from '../validations'
import CustomInput from './components/Form/CustomInput'
import { useState } from 'react'
import CustomSelect from './components/Form/CustomSelect'
import CustomCheckBox from './components/Form/CustomCheckBox'

const Login = () => {
  const loginMutation = useLoginMutation()
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const { t } = useTranslation()
  const [serverErrors, setServerErrors] = useState(null)

  const onSubmit = (values, actions) => {
    loginMutation.mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: (data) => {
          dispatch({ type: 'LOGIN', payload: data.user })
          navigate('/')
          toast.success(t('pages.login.successMessage'))
          actions.resetFom()
        },
        onError: (err) => {
          const error = err?.response?.data?.message
          if (error) setServerErrors(error)
          else console.log(err)
        },
      },
    )
  }

  const initialVal = { email: 'ghalas@gmail.com', password: '12345678' }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Helmet>
        <title>
          {t('logo')} | {t('pages.login.title')}
        </title>
      </Helmet>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CHeaderNav className="d-flex align-items-center justify-content-between gap-3 mx-5">
              <ChangeLang />
              <ChangeTheme />
            </CHeaderNav>
          </CCol>

          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-2">
                <CCardHeader className="d-flex justify-content-center align-items-center">
                  <CIcon customClassName="sidebar-brand-full" icon={cilSchool} height={32} />
                  <h1 className="fw-bold ms-2 m-0 mb-1">{t('logo')}</h1>
                </CCardHeader>

                <CCardBody>
                  {/* FORM */}
                  <Formik
                    initialValues={initialVal}
                    validationSchema={loginSchema}
                    onSubmit={onSubmit}
                  >
                    {(props) => (
                      <Form autoComplete="off">
                        <h1>{t('pages.login.title')}</h1>
                        <p className="text-body-secondary">{t('pages.login.message1')}</p>

                        <CustomInput
                          type="email"
                          icon={cilUser}
                          name={'email'}
                          placeholder={i18next.t('pages.login.fields.email')}
                          disabled={loginMutation.isPending}
                        />

                        <CustomInput
                          type="password"
                          icon={cilLockLocked}
                          name={'password'}
                          placeholder={i18next.t('pages.login.fields.password')}
                          disabled={loginMutation.isPending}
                        />
                        <CRow>
                          <CCol>
                            <CButton
                              disabled={loginMutation.isPending}
                              color="primary"
                              className="px-4 mt-3"
                              type="submit"
                            >
                              {loginMutation.isPending ? (
                                <CSpinner size="sm" />
                              ) : (
                                t('pages.login.title')
                              )}
                            </CButton>
                          </CCol>
                        </CRow>
                      </Form>
                    )}
                  </Formik>

                  {serverErrors && (
                    <div>
                      <hr />
                      <small className="text-danger fst-italic d-flex gap-1 mt-1 align-items-center">
                        <CIcon icon={cilBellExclamation} />

                        {serverErrors}
                      </small>
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
