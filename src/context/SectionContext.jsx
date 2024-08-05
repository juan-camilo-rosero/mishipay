import { createContext, useState} from "react"

export const SectionContext = createContext()

export function SectionContextProvider(props) {
    const [section, setSection] = useState("history")
    const [account, setAccount] = useState(false)

    return (
        <SectionContext.Provider value={{
            section,
            setSection,
            account,
            setAccount
        }}>
            {props.children}
        </SectionContext.Provider>
    )
}