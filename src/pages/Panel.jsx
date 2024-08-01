import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { SectionContext } from '../context/SectionContext';
import Nav from '../components/Nav';
import History from '../components/History';
import PayList from '../components/PayList';
import Account from '../components/Account';
import Send from '../components/Send';
import Balance from '../components/Balance';
import { UserContext } from '../context/UserContext';
import { DBContext } from '../context/DBContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Panel() {
  const navigate = useNavigate();

  const { section, setSection } = useContext(SectionContext);
  const { money, setMoney, email, setEmail, setHistory, setName } = useContext(UserContext);
  const { getUser } = useContext(DBContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        const loadUser = async () => {
          try {
            const userData = await getUser(user.email);
            setMoney(userData.money);
            setLoading(false);
            setName(userData.name)
          } catch (err) {
            console.error(err);
            navigate("/signup");
          }
        };
        loadUser();
      } else {
        navigate("/signup");
      }
    });

    return () => unsubscribe();
  }, [getUser, setEmail, setMoney, navigate]);

  let selectedSection = <History />;
  let desktopSelectedSection = <Send />;

  switch (section) {
    case "history":
      selectedSection = <History />;
      desktopSelectedSection = <Send />;
      break;
    case "paylist":
      selectedSection = <PayList />;
      desktopSelectedSection = <PayList />;
      break;
    case "account":
      selectedSection = <Account />;
      break;
    case "send":
      selectedSection = <Send />;
      desktopSelectedSection = <Send />;
      break;
    default:
      selectedSection = <History />;
      desktopSelectedSection = <Send />;
      break;
  }

  return (
    <>
      <div className={`fixed w-screen h-screen z-10 bg-secondary items-center justify-center ${loading ? "flex" : "hidden"}`}>
        <h2 className='text-2xl text-primary font-semibold'>Cargando...</h2>
      </div>
      <Balance />
      <div className='w-full h-[2vh] bg-secondary' />
      <section className='w-full h-[68vh] lg:h-[73vh] overflow-y-auto lg:hidden bg-secondary'>
        {selectedSection}
      </section>
      <div className='hidden lg:flex flex-col w-[40vw] h-[70vh] lg:h-[75vh] bg-secondary fixed left-0 px-10 py-14'>
        <div className='w-full h-1/5 flex justify-between items-start gap-4'>
          <button onClick={() => setSection("send")} className={`w-1/2 py-2 rounded-lg transition-all text-lg font-semibold ${section === "send" || section === "history" ? "bg-primary text-secondary" : "bg-third text-primary hover:bg-thirdDarker"}`}>Realizar pago</button>
          <button onClick={() => setSection("paylist")} className={`w-1/2 py-2 rounded-lg transition-all text-lg font-semibold ${section === "paylist" ? "bg-primary text-secondary" : "bg-third text-primary hover:bg-thirdDarker"}`}>Pendientes</button>
        </div>
        <section className='w-full h-4/5 bg-third rounded-2xl'>
          {desktopSelectedSection}
        </section>
      </div>
      <div className='hidden lg:flex bg-secondary w-[60vw] h-[70vh] lg:h-[75vh] fixed right-0 px-10 py-14'>
        <section className='w-full h-full bg-third rounded-2xl py-4'>
          <History />
        </section>
      </div>
      <Nav />
    </>
  );
}

export default Panel;
