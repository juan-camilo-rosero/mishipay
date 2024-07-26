import { createContext, useState} from "react"

export const SectionContext = createContext()

export function SectionContextProvider(props) {
    const [section, setSection] = useState("history")

    return (
        <SectionContext.Provider value={{
            section,
            setSection
        }}>
            {props.children}
        </SectionContext.Provider>
    )
}