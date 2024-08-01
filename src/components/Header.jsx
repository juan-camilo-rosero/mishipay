import {Link} from 'react-router-dom'

function Header() {
    return (
      <header className="w-full z-30 py-3 px-6 bg-third text-xl flex items-center justify-center fixed lg:justify-between lg:px-24">
        <div className="flex gap-2 lg:gap-4 items-center">
          <div className="h-6 w-6 rounded-full bg-primary lg:w-8 lg:h-8"/>
          <p className="text-xl font-semibold text-primary lg:text-2xl">Mishipay</p>
        </div>
        <nav className="gap-12 items-center hidden lg:flex">
          <Link to="/login" className="text-xl font-semibold text-primary underline transition-all hover:text-primaryHover">Iniciar sesión</Link>
          <Link to="/signup" className="text-xl font-semibold py-2 px-6 rounded-xl text-center bg-primary text-third transition-all hover:bg-primaryHover">Empieza ahora</Link>
        </nav>
      </header>
    )
  }
  
  export default Header