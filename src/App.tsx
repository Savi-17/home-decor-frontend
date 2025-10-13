import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import Header from './components/feature/Header';
import Footer from './components/feature/Footer';


function App() {
  

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App