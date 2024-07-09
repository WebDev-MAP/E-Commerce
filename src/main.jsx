import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Page404 from './pages/Page404.jsx'
import PageCart from './pages/PageCart.jsx'
import PageCategory from './pages/PageCategory.jsx'
import PageHome from './pages/PageHome.jsx'
import PageDetails from './pages/PageDetails.jsx'
import AuthPage from './pages/AuthPage.jsx'
import PageContact from './pages/PageContact.jsx'
import PageAbout from './pages/PageAbout.jsx'
import PageAdminDashboard from './pages/PageAdminDashboard.jsx'
import PageUserDashboard from './pages/PageUserDashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Page404 />,
    element: <App />,
    children: [
      {
        path: '/',
        element: <PageHome />,
      },
      {
        path: '/cart',
        element: <PageCart />,
      },
      {
        path: '/category',
        element: <PageCategory />,
      },
      {
        path: '/login',
        element: <AuthPage />,
      },
      {
        path: '/contact',
        element: <PageContact />,
      },
      {
        path: '/about',
        element: <PageAbout />,
      },
      {
        path: '/product/:id',
        element: <PageDetails />,
      },
      {
        path: '/admin',
        element: <PageAdminDashboard />,
      },
      {
        path: '/user',
        element: <PageUserDashboard />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)
