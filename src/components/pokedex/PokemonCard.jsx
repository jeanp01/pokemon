import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

    const pokeLinearGradients = {
        grass: "bg-gradient-to-t from-green-300 to-blue-100",
        fire: "bg-gradient-to-t from-orange-400 to-red-500",
        normal: "bg-gradient-to-t from-pink-400 to-purple-400",
        fighting:"bg-gradient-to-t from-red-500 to-red-900",
        flying:"bg-gradient-to-t from-pink-400 to-purple-400",
        poison:"bg-gradient-to-t from-purple-300 to-purple-900",
        ground:"bg-gradient-to-t from-black to-yellow-700",
        rock:"bg-gradient-to-t from-gray-400 to-gray-800",
        bug:"bg-gradient-to-t from-green-200 to-green-500",
        ghost:"bg-gradient-to-t from-purple-600 to-purple-900",
        steel:"bg-gradient-to-t from-black to-green-500",
        water:"bg-gradient-to-t from-blue-100 to-blue-400",
        electric:"bg-gradient-to-t from-black to-ble-500",
        psychic:"bg-gradient-to-t from-black to-red-500",
        ice:"bg-gradient-to-t from-black to-purple-500",
        dragon:"bg-gradient-to-t from-black to-yellow-500",
        dark:"bg-gradient-to-t from-gray-700 to-gray-900",
        fairy:"bg-gradient-to-t from-black to-green-500",
        unknown:"bg-gradient-to-t from-black to-green-500",
        shadown:"bg-gradient-to-t from-black to-green-500"
    }

    const borderPokemon = {
        grass: "red-500",
        fire: "orange-500",
        normal: "purple-500",
        fighting:"red-500",
        flying:"purple-500",
        poison:"purple-500",
        ground:"yellow-500",
        rock:"gray-500",
        bug:"green-500",
        ghost:"purple-500",
        steel:"green-500",
        water:"blue-500",
        electric:"blue-500",
        psychic:"red-500",
        ice:"purple-500",
        dragon:"yellow-500",
        dark:"gray-500",
        fairy:"green-500",
        unknown:"green-500",
        shadown:"green-500"
    }

const PokemonCard = ({pokemonUrl}) => {

    const [pokemon, setPokemon] = useState(null)

    const formatTypesPokemon = (types = []) => {
        const nameTypes = types.map((type) => type.type.name)
        const titleTypes = nameTypes.join(" / ")
        return titleTypes
    }

    
    useEffect(() => {
        axios.get(pokemonUrl)
        .then(({data}) => setPokemon(data))
        .catch((err) => console.log(err))
    },[]);

    return(
        <Link to={`/pokedex/${pokemon?.name}`}>
<div className={` border border-14 border-${borderPokemon[pokemon?.types[0].type.name]}`}>
            <section className={` relative h-40 ${pokeLinearGradients[pokemon?.types[0].type.name]}`}>
                <div className="absolute px-12 -bottom-14 ">
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
                </div>
            </section>


            <section className=" border border-9 ">
                <h3 className="mt-14">{pokemon?.name}</h3>
                <h5>{formatTypesPokemon(pokemon?.types)}</h5>
                <span>type</span>

                <hr />

                <section className="border border-9 ">
                    {
                        pokemon?.stats.slice(0, 4).map((stat) => (
                            <div key={stat.stat.url}>
                                <h6>{stat.stat.name}</h6>
                                <span>{stat.base_stat}</span>
                            </div>
                        ))}

                </section>

            </section>
            </div>

        </Link>
    )
}

export default PokemonCard