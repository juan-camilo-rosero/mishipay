import { useContext, useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { SectionContext } from "../context/SectionContext"
import { UserContext } from "../context/UserContext"
import { DBContext } from "../context/DBContext"
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

function Account() {
  const {account, setAccount} = useContext(SectionContext)
  const {setName, name, email} = useContext(UserContext)
  const {changeUsername} = useContext(DBContext)
  const [username, setUsername] = useState(name)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setUsername(name)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await changeUsername(email, username)
    setLoading(false)
  }
  return (
    <section className={`w-screen lg:h-screen lg:bg-black z-50 lg:bg-opacity-30 flex h-[70vh] bottom-0 fixed items-end lg:items-center justify-center transition-all ${(account) ? "fixed" : "hidden"}`}>
      <div className="bg-secondary w-full h-[70vh] pb-10 pt-2 rounded-xl p-2 flex flex-col items-end md:items-center lg:w-[25rem] lg:h-auto lg:items-end">
        <RiCloseCircleFill className="text-4xl hidden lg:flex text-primary cursor-pointer hover:text-primaryDarker transition-all" onClick={e => setAccount(false)}/>
        <form className="w-full px-8 mt-10 lg:mt-0 md:w-1/2 lg:w-full" onSubmit={handleSubmit}>
          <label className="font-semibold text-lg lg:text-xl">Nombre:</label>
          <input type="text" className="w-full px-2 py-1 rounded-lg border-2 border-black text-lg font-semibold mt-3 lg:px-3 lg:text-xl lg:py-2 bg-secondary outline-none" value={username} onChange={e => setUsername(e.target.value)}/>
          <button type="submit" className={`w-full bg-primary hover:bg-primaryDarker transition-all p-2 rounded-lg text-secondary font-semibold text-lg mt-6 lg:mt-8 ${(loading) ? "opacity-50" : "opacity-100"}`}>{(loading) ? "Cargando..." : "Cambiar nombre"}</button>
        </form>
        <div className="w-full px-8 md:w-1/2 lg:w-full">
          <button className="w-full bg-third p-2 rounded-lg text-primary font-semibold text-lg mt-3 lg:mt-4 hover:bg-thirdDarker transition-all" onClick={async e => {
            await signOut(auth)
            window.location.reload()
          }}>Cerrar sesión</button>
        </div>
      </div>
    </section>
  )
}

export default Account