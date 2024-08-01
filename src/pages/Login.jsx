import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { DBContext } from '../context/DBContext';
import { UserContext } from '../context/UserContext';

function SignUp() {
  const { getDocumentIfExists, getTransactions } = useContext(DBContext)
  const { setEmail, setHistory } = useContext(UserContext)
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true)
    console.log("Iniciando sesión uwu");
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log(res);
      setEmail(res.user.email)
      const userInfo = await getDocumentIfExists("users", email)
      const transactionsInfo = await getTransactions(userInfo.transactions);
      setHistory(transactionsInfo);
      navigate("/panel");
    } catch (error) {
      alert("Correo o contraseña inválidos")
    }
    setLoading(false)
  };

  return (
    <div>
      <div className='w-full h-[15vh] bg-primary flex flex-col items-center justify-center gap-3 lg:fixed lg:w-[50vw] lg:h-screen lg:px-10 lg:justify-start lg:pt-[10vh]'>
        <p className="text-secondary font-semibold text-3xl lg:text-4xl">Ingresar a MishiPay</p>
        <img className='hidden lg:flex absolute left-0 bottom-0 h-[80vh]' src="bingus.png" alt="Bingus" />
      </div>
      <div className='w-full min-h-[85vh] rounded-t-2xl bg-secondary flex flex-col items-center justify-center overflow-y-auto lg:h-screen lg:w-[50vw] lg:right-0 lg:rounded-none lg:fixed'>
        <form className="flex flex-col gap-1 w-full px-8 md:w-1/2 lg:gap-1" onSubmit={handleSubmit}>
          <label className="text-lg lg:text-[1rem] font-semibold">Correo Electrónico</label>
          <input 
            type="email" 
            className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-2" 
            onChange={e => setUserEmail(e.target.value)} 
            value={email}
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
            className={`w-full rounded-lg bg-primary text-secondary py-2 text-xl font-semibold transition-all focus:border-opacity-100 mt-6 ${(loading) ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"}`}>
            {(loading) ? "Cargando..." : "Iniciar sesión"}
          </button>
          <Link to="/signup" className='text-primary underline text-center text-xl mt-2 lg:mt-3'>¿No tienes cuenta?</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
