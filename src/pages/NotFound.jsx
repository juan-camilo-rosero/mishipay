import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <>
        <h1>No encontramos la página que estás buscando :(</h1>
        <Link to="/">Volver al inicio</Link>
    </>
  )
}

export default NotFound