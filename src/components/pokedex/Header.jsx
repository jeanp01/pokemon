import { useDispatch } from "react-redux"
import { setNameTrainer } from "../../store/slices/nameTrainer.slice"

const Header = () => {

    const dispatch = useDispatch()


const handleClickLogout = () => {
    dispatch(setNameTrainer(""))
}
    return (
        <section className="relative max-h-screen">
            <div className="bg-red-600 h-20 relative">
                <div className="absolute left-0 bottom-0 w-[220px] xxs:w-[290px] sm:w-[400px]">
                    <img src="/images/pokedex.png" alt="" />
                </div>
            </div>

            <div className="bg-black h-12"></div>

            <div className="h-20 aspect-square  bg-white border-[10px] border-black rounded-full absolute -bottom-4 right-0 -translate-x-1/2 after:content-[''] after:h-11 after:aspect-square after:bg-gray-700 after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[9px] after:border-black">
                <button onClick={handleClickLogout} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-20">x</button>
            </div>
        </section>
    )
}

export default Header