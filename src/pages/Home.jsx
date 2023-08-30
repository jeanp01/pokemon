import { useDispatch } from "react-redux"
import FooterHome from "../components/home/FooterHome"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

    
    const dispatch = useDispatch()

    const navigate =useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault()
        const nameTrainer = e.target.nameTrainer.value
        dispatch(setNameTrainer(nameTrainer))
        navigate("/pokedex")
    }
    return (
        <main className=" relative grid grid-rows-[1fr_auto] min-h-screen">
            <section className=" flex flex-col justify-center items-center ">
                <div className="">
            <div className=" mb-8 -mt-64   ">
                <img className="w-[200%] h-[200%]"  src="/images/pokedex.png" alt="" />
            </div>
            
            <h3 className="  flex justify-center text-red-500 font-bold text-3xl xl:text-5xl pb-8 ">
                ¡Hello trainer!
            </h3>
            <p className="text-center text-xl mb-4 md:mb-8 ">
                For start, give me your name:
            </p>

            <form onSubmit={handleSubmit} className=" flex justify-center">
                <input className="px-12 border border-9 border-red-500  " required id="nameTrainer" type="text" />
                <button className="bg-red-500 ">Start!</button>
            </form>
            </div>
            </section>

            {/* seccion inferior */}

            <FooterHome />
        </main>
    )
}

export default Home