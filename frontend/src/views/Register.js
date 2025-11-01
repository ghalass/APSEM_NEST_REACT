import { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CHeaderNav,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilSchool, cilUser } from '@coreui/icons'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useCreateUserMutation } from '../features/users/users.queries'

import { useAuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import ChangeLang from './components/ChangeLang'
import ChangeTheme from './components/ChangeTheme'

const Register = () => {
  const initialVal = {
    firstName: 'ghalass',
    lastName: 'ghalass',
    email: 'ghalass@gmail.com',
    password: 'gh@l@ss@dmin',
  }
  const registerMutation = useCreateUserMutation()
  const [formData, setFormData] = useState(initialVal)
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const { t } = useTranslation()

  const onSubmit = (e) => {
    e.preventDefault()
    registerMutation.mutate(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: (data) => {
          dispatch({ type: 'REGISTER', payload: data?.user })
          navigate('/login')
          toast.success(t('pages.register.successMessage'))
        },
        onError: (err) => {
          const serverErrors = err?.response?.data?.message

          if (serverErrors && typeof serverErrors === 'object') {
            setErrors(serverErrors)
          } else {
            setErrors(null)
          }
        },
      },
    )
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Helmet>
        <title>
          {t('logo')} | {t('pages.register.title')}
        </title>
        <meta name="description" content="Bienvenue sur le tableau de bord" />
      </Helmet>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CHeaderNav className="d-flex align-items-center justify-content-between gap-3 mx-5">
              <ChangeLang />
              <ChangeTheme />
            </CHeaderNav>
          </CCol>

          {/*  */}
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-2">
                <CCardHeader className="d-flex justify-content-center align-items-center">
                  <CIcon customClassName="sidebar-brand-full" icon={cilSchool} height={32} />
                  <h1 className="fw-bold ms-2 m-0 mb-1">{t('logo')}</h1>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>{t('pages.register.title')}</h1>
                    <p className="text-body-secondary">{t('pages.register.message1')}</p>

                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        disabled={registerMutation?.isPending}
                        dir="ltr"
                        invalid={errors?.firstName}
                        valid={errors && !errors?.firstName}
                      />
                    </CInputGroup>
                    {errors?.firstName && (
                      <ul className="text-danger fst-italic mb-2 ps-4">
                        {errors.firstName.map((msg, index) => (
                          <li key={index}>
                            <small>{msg}</small>
                          </li>
                        ))}
                      </ul>
                    )}

                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        disabled={registerMutation?.isPending}
                        dir="ltr"
                        invalid={errors?.lastName}
                        valid={errors && !errors?.lastName}
                      />
                    </CInputGroup>
                    {errors?.lastName && (
                      <ul className="text-danger fst-italic mb-2 ps-4">
                        {errors.lastName.map((msg, index) => (
                          <li key={index}>
                            <small>{msg}</small>
                          </li>
                        ))}
                      </ul>
                    )}

                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={registerMutation?.isPending}
                        dir="ltr"
                        invalid={errors?.email}
                        valid={errors && !errors?.email}
                      />
                    </CInputGroup>
                    {errors?.email && (
                      <ul className="text-danger fst-italic mb-2 ps-4">
                        {errors.email.map((msg, index) => (
                          <li key={index}>
                            <small>{msg}</small>
                          </li>
                        ))}
                      </ul>
                    )}

                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={registerMutation?.isPending}
                        dir="ltr"
                        invalid={errors?.password}
                        valid={errors && !errors?.password}
                      />
                    </CInputGroup>
                    {errors?.password && (
                      <ul className="text-danger fst-italic mb-2 ps-4">
                        {errors.password.map((msg, index) => (
                          <li key={index}>
                            <small>{msg}</small>
                          </li>
                        ))}
                      </ul>
                    )}

                    <CRow>
                      <CCol>
                        <CButton
                          disabled={registerMutation.isPending}
                          color="primary"
                          className="px-4 mt-4"
                          type="submit"
                        >
                          <div className="d-flex gap-1 align-items-center justify-content-end">
                            {registerMutation.isPending && <CSpinner size="sm" />}
                            <span>{t('pages.register.title')}</span>
                          </div>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
