import { useContext, useEffect, useState } from "react";
import { RiCloseCircleFill, RiDeleteBin2Fill } from "react-icons/ri";
import { SectionContext } from "../context/SectionContext";
import { UserContext } from "../context/UserContext";
import { DBContext } from "../context/DBContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

function Account() {
  const { account, setAccount } = useContext(SectionContext);
  const { setName, name, email } = useContext(UserContext);
  const { changeUsername, getDocumentIfExists, deleteArrayItem, addArrayItem } = useContext(DBContext);
  const [username, setUsername] = useState(name);
  const [friends, setFriends] = useState({});
  const [loading, setLoading] = useState(false);
  const [amigos, setAmigos] = useState([]);
  const [number, setNumber] = useState([]);
  const [newFriendPhone, setNewFriendPhone] = useState("");

  useEffect(() => {
    const getDoc = async () => {
      if (!email) return
      const doc = await getDocumentIfExists("users", email)
      setNumber(doc.tel)
    }
    getDoc()
  }, [email])
  

  // Obtiene los amigos desde la base de datos y actualiza el estado `friends`
  useEffect(() => {
    const fetchFriends = async () => {
      const friendsGraph = await getDocumentIfExists("friends", "friends");

      if (friendsGraph) {
        const { id, ...restOfGraph } = friendsGraph; // Desestructura y elimina 'id'
        setFriends(restOfGraph);
      }
    };

    fetchFriends();
  }, [name, getDocumentIfExists]);

  // Actualiza la lista de amigos cuando `friends` cambie
  useEffect(() => {
    
    if (friends[number]) {
      setAmigos(friends[number]);
    }
  }, [friends, number]); // Agrega `number` aquí para que se ejecute cuando cambie

  // Efecto para cargar amigos cuando cambia el número
  useEffect(() => {
    const fetchAmigosByNumber = async () => {
      if (number) { // Verifica si `number` tiene un valor
        const friendsGraph = await getDocumentIfExists("friends", "friends");
        if (friendsGraph && friendsGraph[number]) {
          setAmigos(friendsGraph[number]);
        } else {
          setAmigos([]); // Si no hay amigos para ese número, vacía la lista
        }
      }
    };

    fetchAmigosByNumber();
  }, [number, getDocumentIfExists]); // Este efecto se ejecuta cuando `number` cambia

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await changeUsername(number, username); // Actualiza el teléfono en vez del correo
    setLoading(false);
  };

  const handleDeleteFriend = async (friendPhone) => {
    // Primero, actualiza el estado local
    setAmigos((prevAmigos) => {
      const updatedAmigos = prevAmigos.filter((amigo) => amigo !== friendPhone);
      return updatedAmigos;
    });

    // Luego, elimina el amigo de la base de datos
    await deleteArrayItem("friends", "friends", number, friendPhone); // Cambia a número de teléfono
  };

  const handleAddFriend = async () => {
    if (friends[newFriendPhone]) {
      if (!amigos.includes(newFriendPhone)) {
        setAmigos((prevAmigos) => [...prevAmigos, newFriendPhone]);
        setNewFriendPhone("");

        // Aquí puedes agregar el nuevo amigo a la base de datos si es necesario
        await addArrayItem("friends", "friends", number, newFriendPhone);
      } else {
        alert("Este amigo ya está en tu lista.");
      }
    } else {
      alert("Este usuario no existe.");
    }
  };

  return (
    <section
      className={`w-screen lg:h-screen lg:bg-black z-50 lg:bg-opacity-30 flex h-[60vh] pb-20 overflow-y-visible bottom-0 fixed items-end lg:items-end justify-center transition-all ${
        account ? "fixed" : "hidden"
      }`}
    >
      <div className="bg-secondary w-full h-[60vh] pb-10 pt-2 rounded-xl p-2 flex flex-col items-end md:items-center lg:w-[25rem] lg:h-[75vh] overflow-y-auto">
        <div className="w-full flex justify-end px-2">
          <RiCloseCircleFill
            className="text-4xl hidden lg:flex text-primary cursor-pointer hover:text-primaryDarker transition-all"
            onClick={(e) => setAccount(false)}
          />
        </div>
        <form className="w-full px-8 md:w-1/2 lg:w-full mt-10 lg:mt-0" onSubmit={handleSubmit}>
          <label className="font-semibold text-lg lg:text-xl">Nombre:</label>
          <input
            type="text"
            className="w-full px-2 py-1 rounded-lg border-2 border-black text-lg font-semibold mt-3 lg:px-3 lg:text-lg lg:py-2 bg-secondary outline-none mb-8 lg:mb-0"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className={`w-full bg-primary hover:bg-primaryDarker transition-all p-2 rounded-lg text-secondary font-semibold text-lg mt-6 lg:mt-6 ${
              loading ? "opacity-50" : "opacity-100"
            }`}
          >
            {loading ? "Cargando..." : "Cambiar nombre"}
          </button>
        </form>
        <div className="w-full px-8 md:w-1/2 lg:w-full">
          <button
            className="w-full bg-third p-2 rounded-lg text-primary font-semibold text-lg mt-4 lg:mt-4 hover:bg-thirdDarker transition-all mb-12"
            onClick={async (e) => {
              await signOut(auth);
              window.location.reload();
            }}
          >
            Cerrar sesión
          </button>
          <label className="font-semibold text-lg lg:text-xl">Amigos:</label>
          <div className="mt-4 h-32 overflow-y-auto">
            {amigos.map((friendPhone) => (
              <figure
                key={friendPhone}
                className="w-full py-3 px-5 bg-third rounded-lg flex items-center justify-between mb-2"
              >
                <p className="text-base font-semibold">{friendPhone}</p>
                <div onClick={() => handleDeleteFriend(friendPhone)}>
                  <RiDeleteBin2Fill className="text-primary text-lg cursor-pointer hover:text-red-500" />
                </div>
              </figure>
            ))}
          </div>
          <label className="font-semibold text-lg lg:text-xl block w-full mt-8 mb-4">Agregar amigo</label>
          <input
            type="text"
            placeholder="número de tu amigo"
            className="w-full px-3 py-1 rounded-lg border-2 border-black text-lg font-semibold mt-3 lg:px-3 lg:text-lg lg:py-2 bg-secondary outline-none mb-4"
            value={newFriendPhone}
            onChange={(e) => setNewFriendPhone(e.target.value)} // Cambiado a número de teléfono
          />
          <button
            className="w-full bg-primary p-2 rounded-lg text-secondary font-semibold text-lg mt-4 lg:mt-4 hover:bg-primaryDarker transition-all mb-12"
            onClick={handleAddFriend}
          >
            Agregar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Account;
