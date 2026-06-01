import './App.css'
import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import AuthProvider from './context/AuthContext'

const Header = lazy(() => import('./components/Header'))

function App() {
  return (
    <AuthProvider>
      <div className='app'>
        <Suspense fallback={<h1 className="status-message">Loading...</h1>}>
          <Header />
          <Outlet />
        </Suspense>
      </div>
    </AuthProvider>
  )
}

export default App
