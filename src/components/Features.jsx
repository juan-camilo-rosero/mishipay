
import Feature from './Feature'

function Features() {

    const features = [
        {
            title: "Lista de pagos",
            description: "Crea una lista con tus pagos prioritarios para pagarlos todos a la vez",
            icon: "card"
        },
        {
            title: "Multiplataforma",
            description: "Ingresa cuando quieras desde el dispositivo que quieras",
            icon: "computer"
        },
        {
            title: "Completamente gratuito",
            description: "Sin comisiones ni letras pequeñas :3",
            icon: "money"
        },
    ]

    return (
        <section className="w-full flex flex-col items-center pt-20 bg-third px-6 lg:px-32 lg:py-32">
            <h2 className="text-3xl text-center font-semibold md:text-4xl lg:w-4/5 lg:text-5xl">Te ayudamos a organizar <b className="font-bold text-primary">tus finanzas</b></h2>
            <div className='flex flex-wrap w-full gap-10 py-20 justify-between lg:w-[85vw] lg:pt-32 lg:pb-0'>
                {features.map((feature, index) => <Feature key={index} title={feature.title} description={feature.description} icon={feature.icon}/>)}
            </div>

        </section>
    )
}

export default Features
