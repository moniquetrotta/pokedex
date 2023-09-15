const pokeApi = {};
function convertPokemonApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.order;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.home.front_default;

  return pokemon;
}
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokemonApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 24) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json()) //converte response para json
    .then((jsonBody) => jsonBody.results) // pega só os results que é a lista de pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //transforma lista de pokemons em lista de busca de detalhes
    .then((detailRequests) => Promise.all(detailRequests)) //esperando que toda lista de requisição termine
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error));
};
