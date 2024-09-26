import { createContext, useState} from "react"

export const SectionContext = createContext()

export function SectionContextProvider(props) {
    const [section, setSection] = useState("history")
    const [account, setAccount] = useState(false)
    const [map, setMap] = useState(false)

    return (
        <SectionContext.Provider value={{
            section,
            setSection,
            account,
            setAccount,
            map,
            setMap
        }}>
            {props.children}
        </SectionContext.Provider>
    )
}