import {Link, BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'

function Landing() {
  return (
    <>
        <div>
            <img src="#" alt="logo"/>
            <h1>Una billetera digital para <span>tu negocio</span></h1>
            <h2>Desde cualquier dispositivo, sin comisiones y sin complicaciones</h2>
            <div>
                <Link to="/signup">Empezar ahora</Link>
                <Link to="/login">¿Ya tienes cuenta?</Link>
            </div>
        </div>
    </>
  )
}

export default Landing