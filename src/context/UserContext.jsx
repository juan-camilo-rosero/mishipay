import { createContext, useState} from "react"

export const UserContext = createContext()

export function UserContextProvider(props) {
    
    const [money, setMoney] = useState(40000)
    const [history, setHistory] = useState([])
    const [number, setNumber] = useState(null)
    const [name, setName] = useState("David Herrera")
    const [email, setEmail] = useState("")

    return (
        <UserContext.Provider value={{
            money,
            setMoney,
            history,
            setHistory,
            number,
            setNumber,
            name,
            setName,
            email,
            setEmail
        }}>
            {props.children}
        </UserContext.Provider>
    )
}