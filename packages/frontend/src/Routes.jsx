import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import RoutesConfig from './RoutesConfig';
import Home from './views/Home/Home';
import PokemonDetails from './views/PokemonDetails/PokemonDetails';
import PokemonList from './views/PokemonList/PokemonList';

export default function Routes() {
	return (
		<App>
			<BrowserRouter>
				<Switch>
					<Route exact path={RoutesConfig.home()} component={Home} />
					<Route exact path={RoutesConfig.search()} component={PokemonList} />
					<Route exact path={RoutesConfig.pokemonList()} component={PokemonList} />
					<Route exact path={RoutesConfig.pokemonDetails()} component={PokemonDetails} />
				</Switch>
			</BrowserRouter>
		</App>
	);
}
