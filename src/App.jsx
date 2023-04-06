import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Struct from './pages/View'
import 'bootstrap/dist/css/bootstrap.min.css'
import Centers from './components/Centers'
import Login from './components/Login'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element = {<Struct />}>
            <Route path='centers' element = { <Centers/> } />
            <Route path='users' element={<h1>Usuarios</h1>} />
            <Route path='registers' element={<h1>Registros</h1>} />
            <Route path='computers' element={<h1>Computadoras</h1>} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
