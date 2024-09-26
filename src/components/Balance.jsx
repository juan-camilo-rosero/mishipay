import { RiAccountCircleFill, RiMap2Line } from "react-icons/ri";
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { SectionContext } from "../context/SectionContext"

function Balance() {
    const {money} = useContext(UserContext)
    const {setSection, setAccount, setMap} = useContext(SectionContext)
  
    return (
        <div className='w-full h-[30vh] lg:h-[25vh] bg-primary flex flex-col items-center justify-center gap-3 lg:items-start lg:px-10 relative overflow-hidden'>
            <div className='absolute inset-0 bg-[url("https://img.freepik.com/vector-premium/gato-patrones-fisuras-gatito-calico-cabeza-flor-personaje-dibujos-animados_71328-1715.jpg")] bg-center mix-blend-darken'></div>
            <p className="text-secondary font-semibold text-sm z-10">Balance actual</p>
            <p className="text-5xl text-secondary font-semibold z-10">{money}</p>
            <button onClick={() => {
                setAccount(false)
                setSection("send")
                }} className="lg:hidden py-2 px-16 bg-secondary text-primary font-semibold text-xl rounded-md mt-4 z-10">Realizar pago</button>
            <RiAccountCircleFill className="fixed top-5 right-5 text-4xl hidden lg:flex text-secondary lg:opacity-85 transition-all lg:hover:opacity-100 md:right-10 md:top-6 md:text-5xl cursor-pointer z-10" onClick={e => setAccount(true)}/>
            <RiMap2Line className="fixed top-5 right-5 text-4xl lg:right-28 flex text-secondary lg:opacity-85 transition-all lg:hover:opacity-100 md:right-10 md:top-6 md:text-5xl cursor-pointer z-10" onClick={e => setMap(true)}/>
        </div>
    )
}

export default Balance
