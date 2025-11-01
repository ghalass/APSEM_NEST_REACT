import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilPeople } from '@coreui/icons'
import { CCol, CRow, CWidgetStatsF } from '@coreui/react'
import { useDashboardQuery } from '../features/dashboard/dashboard.queries'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const Dashboard = () => {
  const getDashboardQuery = useDashboardQuery()

  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>
          {t('logo')} | {t('pages.dashboard.title')}
        </title>
        <meta name="description" content="Bienvenue sur le tableau de bord" />
      </Helmet>

      <CRow>
        <CCol xs={6}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CIcon icon={cilPeople} height={24} />}
            title={t('pages.dashboard.users')}
            value={getDashboardQuery?.data?.usersCount}
          />
        </CCol>
        <CCol xs={6}>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            icon={<CIcon icon={cilChartPie} height={24} />}
            title="Widget title"
            value="89.9%"
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
