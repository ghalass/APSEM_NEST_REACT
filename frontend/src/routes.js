import React from 'react'
const UsersPage = React.lazy(() => import('./views/users/UsersPage'))
const UserDetailsPage = React.lazy(() => import('./views/users/UserDetailsPage'))
const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Home = React.lazy(() => import('./views/Home'))
const ProfilePage = React.lazy(() => import('./views/Profile'))
const ChatPage = React.lazy(() => import('./views/chat/Chat'))
const NotFoundPage = React.lazy(() => import('./views/NotFoundPage'))
const BacklogPage = React.lazy(() => import('./views/backlog/BacklogPage'))
const BacklogDashboard = React.lazy(() => import('./views/backlog/BacklogDashboard'))

const routes = [
  { path: '/', name: 'Home', element: Home },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: UsersPage },
  { path: '/profile', name: 'Profile', element: ProfilePage },
  { path: '/chat', name: 'Chat', element: ChatPage },
  { path: '*', name: 'Not Found', element: NotFoundPage },
  { path: '/users/:id', name: 'User Details', element: UserDetailsPage },
  { path: '/backlog', name: 'BacklogPage', element: BacklogPage },
  { path: '/backlog_dashboard', name: 'BacklogDashboard', element: BacklogDashboard },
]

export default routes
