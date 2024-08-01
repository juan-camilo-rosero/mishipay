import {Link} from 'react-router-dom'

function HeroSection() {
    return (
      <section className="bg-secondary lg:flex">
          <div className="px-12 pt-20 h-[75vh] flex flex-col gap-8 md:pt-32 md:px-24 md:h-[65vh] lg:h-screen lg:w-[60vw] lg:justify-center lg:pt-0">
              <h1 className="text-3xl text-center font-semibold md:text-4xl lg:w-4/5 lg:text-left lg:text-5xl">La billetera digital para <b className="font-bold text-primary">tu negocio</b></h1>
              <h2 className="text-lg font-semibold text-black opacity-50 text-center md:text-2xl lg:text-left lg:w-4/5">transformamos tu celular en una billetera para pagos instantáneos sin complicaciones, comisiones y desde cualquier dispositivo</h2>
              <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-10 md:pt-8 lg:justify-start">
                  <Link to="/signup" className="rounded-lg bg-primary text-secondary text-xl font-semibold text-center w-auto px-8 py-2 transition-all hover:bg-primaryHover lg:text-2xl lg:py-3 lg:px-12">Empezar ahora</Link>
                  <Link to="/login" className="underline text-primary text-lg font-semibold text-center lg:text-2xl transition-all hover:text-primaryHover">¿Ya tienes cuenta?</Link>
              </div>
          </div>
          <div className="w-full hidden absolute lg:flex flex-col items-center bottom-[7.5vh] md:bottom-[12.5vh] lg:h-screen lg:justify-center lg:bottom-0 lg:pt-16 lg:w-auto lg:right-[32.25vw]">
              <div className="w-[50vw] h-[50vh] bg-slate-200 rounded-xl absolute bottom-0 block mx-1/4 border-[.4rem] border-black md:w-[35vw] lg:w-[15vw] lg:h-[60vh] lg:relative"/>
          </div>
          <div className="h-[25vh] w-full bg-primary md:h-[35vh] lg:h-screen lg:w-[40vw]">
          </div>
      </section>
    )
  }
  
  export default HeroSection
