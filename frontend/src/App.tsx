
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './features/login/login'
import Register from './features/register/register'
import Home from './features/home/home'
import LoginGuard from './shared/Guards/loginGuard'
import AuthGuard from './shared/Guards/authGuard'

function App() {
  //functionality
  

  return (
    //html
    <Routes>
      <Route path='/' element={<Navigate to="/Login" replace />}/>
      <Route path='/login' element={
        <LoginGuard>
        <Login/>
        </LoginGuard>
      } />
      <Route path='/register' element={
        <LoginGuard>
          <Register/>
        </LoginGuard>
        }/>
      <Route path='/home' element={
        <AuthGuard>
          <Home/>
        </AuthGuard>
          }/>
    </Routes>
  )
}

export default App
