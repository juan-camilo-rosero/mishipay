import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { DBContext } from '../context/DBContext';
import { UserContext } from '../context/UserContext';

function SignUp() {
  const {getDocumentIfExists, createUser, getTransactions} = useContext(DBContext)
  const {setNumber, setHistory} = useContext(UserContext)
  const [tel, setTel] = useState("");
  const [code, setCode] = useState("");
  const [hasCode, setHasCode] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
  
    const recapcha = new RecaptchaVerifier(auth, 'recaptcha', {
      'size': 'invisible'
    });
  
    try {
      const confirmation = await signInWithPhoneNumber(auth, `+57${tel}`, recapcha);
      console.log(confirmation);
      setConfirmationResult(confirmation);
      setHasCode(true)
    } catch (error) {
      console.error("Error signing in with phone number:", error);
    }
  }; 
  
  const handleCodeSubmit = async e => {
    e.preventDefault();
    try {
      console.log(code);
      const result = await confirmationResult.confirm(code);
      console.log("Usuario autenticado:", result.user);
      // Redirigir al usuario o hacer algo con el resultado
      // navigate("/panel");
      const userInfo = await getDocumentIfExists("users", tel);
      if(!userInfo){
        await createUser(tel);
      };
      const transactionsInfo = await getTransactions(userInfo.transactions);
      setNumber(tel);
      setHistory(transactionsInfo)
      navigate("/panel");
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("Código incorrecto")
    }
  };

  return (
    <div>
      <div className='w-full h-[65vh] lg:h-[25vh] bg-primary flex flex-col items-center justify-center gap-3 lg:items-start lg:px-10'>
        <p className="text-secondary font-semibold text-3xl">Ingresar a MishiPay</p>
      </div>
      <div className='w-full h-[35vh] rounded-t-2xl bg-secondary flex flex-col items-center justify-center overflow-y-auto'>
        <form className="flex flex-col gap-2 w-full px-8" onSubmit={handleSubmit}>
          <label className={`mb-2 text-lg lg:text-[1rem] font-semibold ${(hasCode) ? "hidden" : ""}`}>¿Cuál es tu número de celular?</label>
          <input type="tel" className={`w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-0 ${(hasCode) ? "hidden" : ""}`} onChange={e => setTel(e.target.value)} value={tel}/>
          <label className={`text-lg lg:text-[1rem] font-semibold ${(hasCode) ? "" : "hidden"}`}>Ingresa el código que enviamos a tu número</label>
          <input type="number" className={`w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-0 ${(hasCode) ? "" : "hidden"}`} onChange={e => setCode(e.target.value)} value={code}/>
          <button type="submit" className={`w-full rounded-lg bg-primary text-secondary py-2 text-xl lg:text-lg font-semibold transition-all focus:border-opacity-100 mt-0 ${(hasCode) ? "hidden" : ""}`}>Continuar</button>
          <div id="recaptcha">
          </div>
          <button className={`w-full rounded-lg bg-primary text-secondary py-2 text-xl lg:text-lg font-semibold transition-all focus:border-opacity-100 mt-0 ${(hasCode) ? "" : "hidden"}`} onClick={handleCodeSubmit}>Confirmar código</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
