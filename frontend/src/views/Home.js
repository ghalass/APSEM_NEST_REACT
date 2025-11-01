import { useAuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  const { user } = useAuthContext()
  const { t, i18n } = useTranslation()

  return (
    <>
      <Helmet>
        <title>
          {t('logo')} | {t('pages.home.title')}
        </title>
        <meta name="description" content="Bienvenue sur le tableau de bord" />
      </Helmet>

      <div className="mt-2">
        <h1 className="text-center">
          {t('welcome')} {`${user?.firstName} ${user?.lastName ?? ''}`}
        </h1>
      </div>
    </>
  )
}

export default Home
