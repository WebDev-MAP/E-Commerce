import Navbar from './components/Navbar.jsx'
import Provider from './context/ShopContext.jsx'

function App() {
  return (
    <Provider>
      <Navbar />
    </Provider>
  )
}

export default App
