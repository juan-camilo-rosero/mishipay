function SignUpForm(props) {

    const {handleSubmit, tel, setTel} = props

    return (
        <form className="flex flex-col gap-2 w-full px-8" onSubmit={handleSubmit}>
            <label className="text-lg lg:text-[1rem] font-semibold">Nombre</label>
            <input type="text" className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-0"/>
            <label className="text-lg lg:text-[1rem] font-semibold">Teléfono</label>
            <input type="tel" className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-0" onChange={e => setTel(e.target.value)} value={tel}/>
            <label className="text-lg lg:text-[1rem] font-semibold">Contraseña</label>
            <input type="password" className="w-full outline-none border-2 border-black border-opacity-50 text-black rounded-lg bg-secondary py-1 px-4 text-lg lg:text-[1rem] transition-all focus:border-opacity-100 mb-6 lg:mb-0"/>
            <button id="recaptcha" type="submit" className="w-full rounded-lg bg-primary text-secondary py-2 text-xl lg:text-lg font-semibold transition-all focus:border-opacity-100 mt-6">Empezar ahora</button>
        </form>
    )
}

export default SignUpForm