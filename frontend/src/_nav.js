// src/_nav.js
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import { cilEqualizer, cilListRich, cilSpeedometer, cilStar, cilWarning } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const useNav = () => {
  const { t } = useTranslation()

  return [
    {
      component: CNavItem,
      name: t('sideBar.dashboard'),
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },

    // {
    //   component: CNavTitle,
    //   name: t('sideBar.settings'),
    // },

    // {
    //   component: CNavItem,
    //   name: 'Colors',
    //   to: '/theme/colors',
    //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    // },

    // {
    //   component: CNavTitle,
    //   name: 'Components',
    // },

    {
      component: CNavGroup,
      name: 'Suivi Backlog',
      icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
      items: [
        { component: CNavItem, name: 'Dashboard Backlog', to: '/backlog_dashboard' },
        { component: CNavItem, name: 'Backlog', to: '/backlog' },
      ],
    },

    // {
    //   component: CNavTitle,
    //   name: 'Configs',
    // },
    {
      component: CNavGroup,
      name: t('sideBar.settings'),
      icon: <CIcon icon={cilEqualizer} customClassName="nav-icon" />,
      items: [{ component: CNavItem, name: t('sideBar.users'), to: '/users' }],
    },
  ]
}

export default useNav

// // src/_nav.js

// import CIcon from '@coreui/icons-react'
// import { cilDrop, cilSpeedometer, cilStar } from '@coreui/icons'
// import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

// const _nav = [
//   {
//     component: CNavItem,
//     name: 'Dashboard',
//     to: '/dashboard',
//     icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
//   },
//   {
//     component: CNavTitle,
//     name: 'Theme',
//   },
//   {
//     component: CNavItem,
//     name: 'Colors',
//     to: '/theme/colors',
//     icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
//   },

//   {
//     component: CNavTitle,
//     name: 'Components',
//   },

//   {
//     component: CNavGroup,
//     name: 'Icons',
//     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'CoreUI Free',
//         to: '/icons/coreui-icons',
//       },
//       {
//         component: CNavItem,
//         name: 'CoreUI Flags',
//         to: '/icons/flags',
//       },
//       {
//         component: CNavItem,
//         name: 'CoreUI Brands',
//         to: '/icons/brands',
//       },
//     ],
//   },

//   {
//     component: CNavTitle,
//     name: 'Configs',
//   },

//   {
//     component: CNavGroup,
//     name: 'Configs',
//     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Users',
//         to: '/users',
//       },
//       {
//         component: CNavItem,
//         name: 'Register',
//         to: '/register',
//       },
//     ],
//   },
// ]

// export default _nav
