import {
  CAvatar,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLogoutMutation } from '../../features/users/users.queries' // ✅ version refactorée

import { useAuthContext } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'

const AppHeaderDropdown = () => {
  const logoutMutation = useLogoutMutation()
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const { t } = useTranslation()

  const onLogout = (e) => {
    e.preventDefault()
    logoutMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          dispatch({ type: 'LOGOUT', payload: data?.user })
          navigate('/login')
          toast.success(t('pages.logout.successMessage'))
        },
        onError: (err) => {
          console.log(err?.message)
          toast.error(err?.message)
        },
      },
    )
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
          {t('navBar.user.title')}
        </CDropdownHeader>
        <CDropdownItem href="#/profile">
          <CIcon icon={cilUser} className="me-2" />
          {t('navBar.user.profil')}
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem as={'button'} onClick={onLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          {t('navBar.user.logout')}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
