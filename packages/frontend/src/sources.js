export default {
  generations: () => '/generations',
  types: () => '/types',
  pokemonList: () => '/pokemon/',
  pokemonDetails: (id = ':id') => `/pokemon/${id}`,
};
