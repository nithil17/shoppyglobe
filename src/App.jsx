import './App.css'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import AuthProvider from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className='app'>
        <Header />
        <Suspense fallback={<h1 className="status-message">Loading...</h1>}>
          <Outlet />
        </Suspense>
      </div>
    </AuthProvider>
  )
}

export default App
