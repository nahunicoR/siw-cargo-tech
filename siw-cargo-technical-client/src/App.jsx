
/*eslint-disable no-unused-vars*/
import Home from './views/Home';
import LogIn from './views/LogIn';
import UpdateUser from './views/UpdateUser';
import Register from './views/Register'
import { Routes, Route } from 'react-router-dom';
import Perfil from './views/Perfil';



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/facturas' element={<Perfil />} />
        <Route path='/actualizar-usuario' element={<UpdateUser />} />
        <Route path='/registro' element={<Register />} />
      </Routes>

    </>
  )
}

export default App
