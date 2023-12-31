import { useSelector } from "react-redux"
import Header from "../components/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import PokemonCard from "../components/pokedex/PokemonCard"

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])

    const [namePokemon, setNamePokemon] = useState("")

    const [types, setTypes] = useState ([])

    const [currentType, setCurrentType] = useState("")

    const [currentPage, setCurrentPage] = useState(1)

    const nameTrainer = useSelector((store) => store.nameTrainer)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setNamePokemon(e.target.namePokemon.value)
        
    }

    const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(namePokemon.toLowerCase()))

    const paginationLogic = () => {
        // cantidad de pokemons or pagina
        const POKEMONS_PER_PAGE = 12

        //pokemon que se van a mostrar en la pagina actual
        const sliceStart =(currentPage - 1) * POKEMONS_PER_PAGE
        const sliceEnd = sliceStart + POKEMONS_PER_PAGE
        const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

        //ultima pagina
        const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

        //bloque actual
        const PAGES_PER_BLOCK = 5
        const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

        //paginas que se van a mostrar en el bloque actual
        const pagesInBlock = []
        const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
        const maxPage = actualBlock * PAGES_PER_BLOCK
        for(let i = minPage; i <= maxPage; i++){
            if (i <= lastPage) {
                pagesInBlock.push(i)
            }
        }
        return {pokemonInPage, lastPage, pagesInBlock}
    }

    const {lastPage, pagesInBlock, pokemonInPage} =paginationLogic() 

    const handleClickPreviusPage = () => {
        const newCurrentPage = currentPage -1
        if (newCurrentPage >= 1) {
            setCurrentPage(newCurrentPage)
        }
    }

    const handleClickNextPage = () => {
        const newCurrentPage = currentPage +1
        if (newCurrentPage <= lastPage) {
            setCurrentPage(newCurrentPage)
        }
    }

    useEffect(() => {
        if (!currentType) {
        const URL = "https://pokeapi.co/api/v2/pokemon?limit=40"

        axios.get(URL)
        .then(({data}) => setPokemons(data.results))
        .catch((err) => console.log(err))
        }
    },[currentType])

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type"

        axios
        .get(URL)
        .then(({data}) => {
        const newTypes = data.results.map((type) => type.name);setTypes(newTypes)
    })

        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        if(currentType){
        const URL = `https://pokeapi.co/api/v2/type/${currentType}/`

        axios.get(URL)
        .then(({data}) =>{
            const pokemonsByType = data.pokemon.map((pokemon) => pokemon.pokemon )
            setPokemons(pokemonsByType)
        })
        .catch((err) => console.log(err))
        }
    },[currentType])

    useEffect(() => {
        setCurrentPage(1)
    }, [namePokemon, currentType])


    return (
        <section className="min-h-screen">
            <Header />


            <section className="py-6 px-5 font-bold text-xl ">
            <h3 className="pb-8"> <span className="text-red-500">Welcome {nameTrainer}</span>, here you can find your favorite pokemon</h3>
            
            <form className=" grid items-center justify-center   md:pt-7  md:pb-7 border p-8 " onSubmit={handleSubmit} >
                <div className="md:px-4 mb-4 grid">
                    <input className="md:p-2 md:px-2 md:w-auto md:p-4 md:px-8  border border-9 rounded-md mb-4 border-red-500" id="namePokemon" placeholder="search your pokemon" type="text" />
                    <button className=" md:px-8 md:p-4 text-white bg-red-500 p-4 rounded-md items-center justify-center">search</button>
                </div>

                
                <select className=" sm:py-4 border border-red-500 rounded-md mb-4 " onChange={(e) => setCurrentType(e.target.value)}>
                    <option className=" md:w-auto text-red-800 md:px-8 border border-9 border-red-500 " value="" >All</option>
                    {types.map((type) => (
                        <option className="capitalize" value={type} key={type}>{type}</option>
                    ))}
                    
                </select>
                
            </form>
            </section>

            {/*paginacion */}

            <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
                {/*paginacion anterior */}
                <li onClick={() => setCurrentPage(1)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<<"}</li>

                {/*paginacion anterior */}
                <li onClick={handleClickPreviusPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<"}</li>

                {/*lista de paginas */}
                    {
                        pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-red-400"}`} key={numberPage}>{numberPage}</li>)
                    }
                {/*pagina siguiente */}
                <li  onClick={handleClickNextPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{">"}</li>
                {/*ultima pagina */}
                <li onClick={() => setCurrentPage(lastPage)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{">>"}</li>
            </ul>

            {/*seccion lista de pokemons */}
            <section className="grid gap-8 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1024px] mx-auto py-6 ">
                {pokemonInPage.map((pokemon) => (
                    <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
                ))}
            </section>
        </section>
    )
}
export default Pokedex