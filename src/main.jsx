import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Provider from './context/ShopContext.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Page404 from './pages/Page404.jsx'
import PageCart from './pages/PageCart.jsx'
import PageHome from './pages/PageHome.jsx'
import PageDetails from './pages/PageDetails.jsx'

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
        path: '/home',
        element: <PageHome />,
      },
      {
        path: 'home/cart',
        element: <PageCart />,
      },
      {
        path: 'product/:id',
        element: <PageDetails />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <RouterProvider router={router} />
  </Provider>
)
