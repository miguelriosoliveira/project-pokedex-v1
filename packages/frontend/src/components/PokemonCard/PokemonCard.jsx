import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

import RoutesConfig from '../../RoutesConfig';
import Sprite from '../Sprite/Sprite';

import './PokemonCard.css';

function PokemonCard({ history, pokemon, staticContext, ...props }) {
	return (
		<div
			className="pokemon-card-component"
			onClick={() => history.push(RoutesConfig.pokemonDetails(pokemon.number))}
			{...props}
		>
			<Typography noWrap className="name">
				{pokemon.displayName} #{pokemon.number}
			</Typography>

			<Sprite className="sprite" name={pokemon.displayName} number={pokemon.number} />

			<div className={`types type--${pokemon.types[0]}`}>
				{pokemon.types.map(type => (
					<Typography key={type} variant="overline" className={`type type--${type}`}>
						{type}
					</Typography>
				))}
			</div>
		</div>
	);
}

export default withRouter(PokemonCard);
