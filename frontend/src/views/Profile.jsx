import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useAuthContext } from '../context/AuthContext'
import avatar8 from './../assets/images/avatars/8.jpg'
import { cilPencil } from '@coreui/icons'
import { getUserRole } from '../utils/func'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const ProfilePage = () => {
  const { user } = useAuthContext()

  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>
          {t('logo')} | {t('pages.profile.title')}
        </title>
        <meta name="description" content="Bienvenue sur le tableau de bord" />
      </Helmet>

      <CRow className="">
        <CCol md={4}>
          <CCard className="mt-1">
            <CCardBody>
              <div className="d-flex align-items-top justify-content-between">
                <div>
                  <CAvatar
                    src={avatar8}
                    className="border border-primary border-2 p-1 col-sm mb-1"
                    style={{ height: '100px', width: '100px' }}
                  />
                </div>

                <div>
                  <CButton
                    size="sm"
                    color="primary"
                    variant="outline"
                    className="rounded-pill"
                    onClick={() => {
                      // setEntity(initialVal)
                      // setVisible(!visible)
                      // setOperation('create')
                    }}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                </div>
              </div>
              <CCardTitle className="text-uppercase">
                <CBadge textBgColor="light" shape="rounded-pill">
                  <span className="text-uppercase">
                    {user?.name} {user?.lastName}
                  </span>
                </CBadge>
              </CCardTitle>
              <CCardSubtitle className="mb-2 text-body-secondary text-uppercase">
                <CBadge color="info" shape="rounded-pill">
                  <span className="text-uppercase">{getUserRole(user)}</span>
                </CBadge>
              </CCardSubtitle>
              <CCardText>
                <CBadge color="secondary" shape="rounded-pill">
                  <span className="">{user?.email}</span>
                </CBadge>
              </CCardText>
              <CCardLink href="#">Card link</CCardLink>
              <CCardLink href="#">Another link</CCardLink>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={8}>
          <CCard className="mt-1">
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardSubtitle className="mb-2 text-body-secondary">Card subtitle</CCardSubtitle>
              <CCardText>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </CCardText>
              <CCardLink href="#">Card link</CCardLink>
              <CCardLink href="#">Another link</CCardLink>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ProfilePage
