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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className=" mb-8 -mt-64 ">
                <img className="w-[200%] h-[200%]"  src="/images/pokedex.png" alt="" />
            </div>
            <h3 className=" flex justify-center text-red-500 font-bold text-3xl xl:text-5xl pb-8 ">
                ¡Hello trainer!
            </h3>
            <p className="text-center text-xl mb-4 md:mb-8 ">
                For start, give me your name:
            </p>

            <form onSubmit={handleSubmit}>
                <input className="px-12 border border-9 border-red-500  p-2 outline-none   items-center" required id="nameTrainer" type="text" />
                <button className="bg-red-500 p-2 items-center md:p-4 h-auto shadow-md hover:shadow-lg">Start!</button>
            </form>
            </div>
            </section>

            {/* seccion inferior */}

            <FooterHome />
        </main>
    )
}

export default Home