
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './features/login/login'
import Register from './features/register/register'
import Home from './features/home/home'
import LoginGuard from './shared/Guards/loginGuard'
import AuthGuard from './shared/Guards/authGuard'
import Profile from './features/Profile/profile'

function App() {
  //functionality
  

  return (
    //html
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace />}/>
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
        <Route path='/profile' element={
        <AuthGuard>
          <Profile/>
        </AuthGuard>
        }/>
    </Routes>
  )
}

export default App
