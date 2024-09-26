import { useContext } from "react";
import { RiHome3Fill, RiAccountCircleFill, RiFileListFill } from "react-icons/ri";
import { SectionContext } from "../context/SectionContext";

function Nav() {
  const {section, setSection, setAccount, account, setMap} = useContext(SectionContext)
  return (
    <div className="fixed bottom-0 w-full h-24 bg-secondary flex items-center justify-between px-8 md:px-24 lg:hidden shadow-md z-50">
        <figure onClick={() => {
          setSection("history")
          setAccount(false)
          setMap(false)
          }} className={`flex flex-col items-center justify-center gap-1 cursor-pointer hover:opacity-100 transition-all ${(section === "history") ? "text-primary" : "opacity-50"}`}>
            <RiHome3Fill className="text-3xl"/>
            <p className="font-semibold text-sm">Inicio</p>
        </figure>
        <figure onClick={() => {
          setSection("paylist")
          setAccount(false)
          setMap(false)
          }} className={`flex flex-col items-center justify-center gap-1 cursor-pointer hover:opacity-100 transition-all ${(section === "paylist") ? "text-primary" : "opacity-50"}`}>
            <RiFileListFill className="text-3xl"/>
            <p className="font-semibold text-sm">Pendientes</p>
        </figure>
        <figure onClick={() => {
          setAccount(true)
          setMap(false)
          setSection("none")
        }} className={`flex flex-col items-center justify-center gap-1 cursor-pointer hover:opacity-100 transition-all ${(account) ? "text-primary" : "opacity-50"}`}>
            <RiAccountCircleFill className="text-3xl"/>
            <p className="font-semibold text-sm">Perfil</p>
        </figure>
    </div>
  )
}

export default Nav