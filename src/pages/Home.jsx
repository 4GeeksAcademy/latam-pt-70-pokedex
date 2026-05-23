import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer";

const pokemonImage = (pokemonNumber) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber}.svg`;

const capitalize = (name) => {
  if (!name) return ""
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const PokemonCard = (props) => {
  const { store, dispatch } = useGlobalReducer();

  const pokedexNumber = props.id;
  const pokemonName = capitalize(props.name);

  const isLiked = store.likes.includes(pokemonName);

  return <div className="col-12 col-sm-6 col-md-4 col-lg-4  p-3">
		<div className="card">
			<img src={pokemonImage(pokedexNumber)}
				className="card-img-top" alt={(pokemonName + '-' + pokedexNumber)}
				style={{ maxHeight: "100px" }}
			/>
			<div className="card-body">
				<h5 className="card-title">{pokemonName}</h5>

				<Link to={"/pokemon/" + pokedexNumber } className="btn btn-primary">
				  Detalles
				</Link>

        <button className={ isLiked ? "btn btn-outline-danger mx-2" : "btn btn-danger mx-2"}
          onClick={() => dispatch({
            type: "add_like",
            payload: { pokemonName } 
          })}
        >
          <span className="mx-1">
            { isLiked ? "Liked" : "Like"}
          </span>
          <i className={"fa-solid fa-heart " + (isLiked ? 'text-danger-emphasis' : '' ) }></i>
        </button>
			
      </div>
		</div>
	</div>;
}

const Home = () => {

  const [ isLoading, setLoading ] = useState(true);
  const [ pokemons, setPokemons ] = useState([]);

  const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon";


  const getDragonBallCharacters = async () => {
    setLoading(true)
    try {
      let resp = await fetch(apiBaseUrl)
      let data = await resp.json()
      setPokemons(data.results);
    }catch(err){
      console.log(err);
    }finally {
      setLoading(false)
    }
  };

  const loadMorePokemons = async (offset = 20, limit = 20) => {

    const filtros = `?offset=${offset}&limit=${limit}`;
    
	setLoading(true)
    try {
      let resp = await fetch(apiBaseUrl + filtros)
      let data = await resp.json()
      setPokemons([ ...pokemons, ...data.results]);
    }catch(err){
      console.log(err);
    }finally {
      setLoading(false)
    }
  }

  // onload
  useEffect(() => {
    getDragonBallCharacters()
  },[]);

  return (
    <div className="text-center my-5">
      { isLoading && <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
          </div>
        </div> }

      <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        alt="logo" />

      <div className="d-flex flex-wrap">
      {
        pokemons && pokemons.map( (poke, index) => {
          return <PokemonCard key={index} name={poke.name} id={index + 1} />
        })
      }
      </div>

      <button className="btn btn-warning mt-5"
        onClick={() => loadMorePokemons(pokemons.length, 100)}
      >
        load more...
      </button>

    </div>
  );
};

export default Home;
