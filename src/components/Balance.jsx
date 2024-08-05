import { RiAccountCircleFill } from "react-icons/ri";
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { SectionContext } from "../context/SectionContext"

function Balance() {
    const {money} = useContext(UserContext)
    const {setSection, setAccount} = useContext(SectionContext)
  return (
    <div className='w-full h-[30vh] lg:h-[25vh] bg-primary flex flex-col items-center justify-center gap-3 lg:items-start lg:px-10'>
      <p className="text-secondary font-semibold text-sm">Balance actual</p>
      <p className="text-5xl text-secondary font-semibold">{money}</p>
      <button onClick={() => setSection("send")} className="lg:hidden py-2 px-16 bg-secondary text-primary font-semibold text-xl rounded-md mt-4">Realizar pago</button>
      <RiAccountCircleFill className="fixed top-5 right-5 text-4xl text-secondary lg:opacity-85 transition-all lg:hover:opacity-100 md:right-10 md:top-6 md:text-5xl cursor-pointer" onClick={e => setAccount(true)}/>
    </div>
  )
}

export default Balance