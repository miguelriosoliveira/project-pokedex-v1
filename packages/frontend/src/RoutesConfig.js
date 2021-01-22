export default {
  home: () => '/',
  search: () => '/search',
  pokemonList: (generationName = ':generationName') => `/${generationName}`,
  pokemonDetails: (id = ':id') => `/pokemon/${id}`,
};
