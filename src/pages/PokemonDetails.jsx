import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon/";

const PokemonDetail = () => {

    const [ pokemonData, setPokemonData ] = useState({})
    const { pokemonNumber } = useParams();

    const loadPokemonData = async () => {
        try {
            let resp = await fetch(apiBaseUrl+pokemonNumber)
            let data = await resp.json()
            setPokemonData(data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        loadPokemonData()
    },[])

    return <>
        <div>
            <h1>Pokemon Name Detail: {pokemonNumber}</h1>

            <p>
                {JSON.stringify(pokemonData)}
            </p>

        </div>
    </>
}

export default PokemonDetail;