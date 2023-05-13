import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import View from './pages/View'
import 'bootstrap/dist/css/bootstrap.min.css'
import Centers from './components/Centers'
import Login from './components/Login'
import Users from './components/Users'
import Registers from './components/Registers'
import Computers from './components/Computers'
import CenterPage from './pages/CenterPage'
import Logout from './components/Logout'
import { useState } from 'react'

function App() {

  const [ user, setUser ] = useState(null)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/logout' element = { <Logout /> } />
          <Route path='/' element = {<View user={user} />}>
            <Route path='centers' element = { <Centers/> } />
            <Route path='centers/:id' element={ <CenterPage /> } />
            <Route path='users' element={<Users />} />
            <Route path='registers' element={<Registers />} />
            <Route path='computers' element={ <Computers /> } />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
