import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { DBContext } from '../context/DBContext';
import { UserContext } from '../context/UserContext';

function SignUp() {
  const { getDocumentIfExists, createUser, getTransactions } = useContext(DBContext)
  const { setEmail, setHistory } = useContext(UserContext)
  const [email, setUserEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuario registrado:", user);

      let userInfo = await getDocumentIfExists("users", tel);
      if (!userInfo) {
        userInfo = await createUser(tel, email, name); // Modificar la función createUser para aceptar nombre también.
      }

      const transactionsInfo = await getTransactions(userInfo.transactions);
      setEmail(email);
      setHistory(transactionsInfo);
      navigate("/panel");
    } catch (error) {
      console.error("Error registrando usuario:", error);
    }
  };

  return (
    <div>
      <div className='w-full h-[15vh] bg-primary flex flex-col items-center justify-center gap-3 lg:fixed lg:w-[50vw] lg:h-screen lg:px-10 lg:pt-[10vh]'>
        <p className="text-secondary font-semibold text-3xl lg:text-4xl lg:absolute lg:top-16">Crea tu cuenta</p>
        <img className='hidden lg:flex h-[40vh]' src="nyan_cat_money.gif" alt="Bingus" />
      </div>
      <div className='w-full min-h-[85vh] rounded-t-2xl bg-secondary flex flex-col items-center justify-center overflow-y-auto lg:h-screen lg:w-[50vw] lg:right-0 lg:rounded-none lg:fixed'>
        <form className="flex flex-col gap-1 w-full px-8 md:w-1/2 lg:gap-1" onSubmit={handleSubmit}>
          <label className="text-lg lg:text-[1rem] font-semibold">Nombre</label>
          <input 
            type="text" 
            className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-2" 
            onChange={e => setName(e.target.value)} 
            value={name}
            required
          />
          <label className="text-lg lg:text-[1rem] font-semibold">Correo Electrónico</label>
          <input 
            type="email" 
            className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-2" 
            onChange={e => setUserEmail(e.target.value)} 
            value={email}
            required
          />
          <label className="text-lg lg:text-[1rem] font-semibold">Teléfono</label>
          <input 
            type="tel" 
            className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-2" 
            onChange={e => setTel(e.target.value)} 
            value={tel}
            required
          />
          <label className="text-lg lg:text-[1rem] font-semibold">Contraseña</label>
          <input 
            type="password" 
            className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-2" 
            onChange={e => setPassword(e.target.value)} 
            value={password}
            required
          />
          <button 
            type="submit" 
            className="w-full rounded-lg bg-primary text-secondary py-2 text-xl font-semibold transition-all focus:border-opacity-100 mt-6">
            Empezar ahora
          </button>
          <Link to="/login" className='text-primary underline text-center text-xl mt-2 lg:mt-3'>¿Ya tienes cuenta?</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
