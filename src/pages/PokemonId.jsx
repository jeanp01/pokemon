import { useParams } from "react-router-dom"
import Header from "../components/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"

const PokemonId = () => {

    const [pokemon, setPokemon] = useState(null)

    const {pokemonName} = useParams()

    const percentProgresStat = (baseStat) => {
        const STAT_MAX = 255
        return `${(baseStat * 100) / 255}%`
    }

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

        axios.get(url)
        .then(({data}) => setPokemon(data))
        .catch((err) =>  console.log(err) )
    })


    return(
        <main>
            <Header />

        <section>

        <article>
            <section>
                <h4>stats</h4>
                <section>
                    {
                        pokemon?.stats.map((stat) => (
                            <article key={stat.stat.url}>
                                <section>
                                    <h5>{stat.stat.name}</h5>
                                    <span>{stat.base_stat}</span>
                                </section>

                                <div className="bg-gray-300 h-8 rounded-md overflow-hidden">
                                    <div style={{width: percentProgresStat(stat.base_stat)}} className="h-full bg-yellow-500"></div>
                                </div>

                            </article>
                        ))
                    }
                </section>
            </section>
        </article>

        </section>

        </main>
    )
}

export default PokemonId