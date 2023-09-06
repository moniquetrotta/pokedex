const pokeApi = {};
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url).then((response) => response.json());
};
pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json()) //converte response para json
    .then((jsonBody) => jsonBody.results) // pega só os results que é a lista de pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //transforma lista de pokemons em lista de busca de detalhes
    .then((detailRequests) => Promise.all(detailRequests)) //esperando que toda lista de requisição termine
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error));
};

Promise.all([]);
