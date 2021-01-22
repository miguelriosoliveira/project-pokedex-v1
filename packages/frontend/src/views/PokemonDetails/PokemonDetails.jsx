import React, { useState, useEffect } from 'react';

import { Typography, Button } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

import api from '../../services/api';

import PokemonCard from '../../components/PokemonCard/PokemonCard';
import Sprite from '../../components/Sprite/Sprite';

import './PokemonDetails.css';

export default function PokemonDetails({ history, match }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      let response = null;
      try {
        response = await api.get(`/pokemon/${match.params.id}`);
      } catch (error) {
        console.error(error);
      }
      setPokemon(response.data);
    };

    loadPokemon();
  }, [match.params.id]);

  return (
    pokemon && (
      <div className="pokemon-details-component">
        <div className="header">
          <Button
            variant="contained"
            color="default"
            startIcon={<ArrowBackIcon />}
            onClick={history.goBack}
          >
            Back
          </Button>
        </div>

        <div className="main">
          <div className="sprite">
            <Sprite name={pokemon.name} number={pokemon.number} />
          </div>

          <div className="infos">
            <Typography variant="h4" className="name">
              {pokemon.name} #{pokemon.number}
            </Typography>

            <div className="description">
              <Typography variant="body1" className="text--bold">
                {pokemon.description}
              </Typography>
            </div>

            <div className="types">
              <div className="own">
                <div className="title">
                  <Typography variant="body1" className="text--bold">
                    {pokemon.types.length === 1 ? 'TYPE' : 'TYPES'}
                  </Typography>
                </div>
                <div className="list">
                  {pokemon.types.map(type => (
                    <Typography
                      key={type}
                      align="center"
                      variant="overline"
                      className={`type type--${type}`}
                    >
                      {type}
                    </Typography>
                  ))}
                </div>
              </div>

              <div className="weaknesses">
                <div className="title">
                  <ReportProblemIcon />
                  <Typography variant="body1" className="text--bold">
                    WEAKENESSES
                  </Typography>
                  <ReportProblemIcon />
                </div>
                <div className="list">
                  {pokemon.weaknesses.map(weakness => (
                    <Typography
                      key={weakness}
                      align="center"
                      variant="overline"
                      className={`type type--${weakness}`}
                    >
                      {weakness}
                    </Typography>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="evolution-chain">
          <Typography variant="body1" className="title text--bold">
            EVOLUTION CHAIN
          </Typography>

          <div className="list">
            <div className="common">
              {pokemon.evolutionChain.common.map((poke, index) => {
                let arrowIcon = <ArrowRightIcon />;

                if (
                  index === pokemon.evolutionChain.common.length - 1 &&
                  pokemon.evolutionChain.variant.length === 0
                ) {
                  arrowIcon = null;
                }

                return (
                  <div key={poke.displayName} className="pokemon-form">
                    <PokemonCard key={poke.number} pokemon={poke} />
                    {arrowIcon}
                  </div>
                );
              })}
            </div>

            {pokemon.evolutionChain.variant.length > 0 && (
              <div className="variant">
                <div className="half">
                  {pokemon.evolutionChain.variant
                    .slice(0, Math.floor(pokemon.evolutionChain.variant.length / 2))
                    .map(poke => {
                      return <PokemonCard key={poke.number} pokemon={poke} />;
                    })}
                </div>

                <div className="half">
                  {pokemon.evolutionChain.variant
                    .slice(Math.ceil(pokemon.evolutionChain.variant.length / 2))
                    .map(poke => {
                      return <PokemonCard key={poke.number} pokemon={poke} />;
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
