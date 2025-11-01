import useUIStore from '../../stores/store'
import CIcon from '@coreui/icons-react'
import { cifFr, cifSa } from '@coreui/icons'
import { useTranslation } from 'react-i18next'
import { CButton } from '@coreui/react'

const ChangeLang = () => {
  const { lang, changeLang } = useUIStore()
  const handleLanguageClick = () => {
    lang === 'fr' ? changeLang('ar') : changeLang('fr')
  }
  const { t } = useTranslation()

  return (
    <>
      <CButton className="d-flex btn gap-1" onClick={handleLanguageClick}>
        <CIcon icon={lang === 'fr' ? cifSa : cifFr} size="lg" className="mt-1" />
        {lang === 'fr' ? 'عربي' : 'Français'}
      </CButton>
    </>
  )
}

export default ChangeLang
