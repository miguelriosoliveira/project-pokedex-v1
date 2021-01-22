import React, { useState, useEffect, Fragment } from 'react';

import { Divider, Typography, Button } from '@material-ui/core';

import pokeballSpinning from '../../assets/pokeball-spinning.webp';
import logo from '../../assets/pokemon-logo.png';
import RoutesConfig from '../../RoutesConfig';
import api from '../../services/api';
import sources from '../../sources';

import Sprite from '../../components/Sprite/Sprite';

import './Home.css';

export default function Home({ history }) {
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // componentDidMount
  useEffect(() => {
    async function getGenerations() {
      let response = null;

      setLoading(true);
      try {
        response = await api.get(sources.generations());
      } catch (error) {
        if (!error.response) {
          setError('Our servers are in maintenance time, please check back later!');
        }
        console.error(error);
        return;
      } finally {
        setLoading(false);
      }

      setGenerations(response.data);
    }

    getGenerations();
  }, []);

  return (
    <div className="home-component">
      <img src={logo} alt="pokemon-logo" className="logo" />

      {loading ? (
        <img src={pokeballSpinning} alt="loading" />
      ) : error ? (
        <div className="maintenance">
          <Typography variant="h6">{error}</Typography>
        </div>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(RoutesConfig.search())}
          >
            Search all
          </Button>

          <div className="generations">
            {generations.map(gen => (
              <div
                key={gen.name}
                className="generation-wrap"
                onClick={() => history.push(RoutesConfig.pokemonList(gen.name))}
              >
                <div className="generation-card">
                  <Typography variant="body1" className="generation-name">
                    {gen.displayName}
                  </Typography>
                  <div className="starters">
                    {gen.starters.map((starter, index, array) => (
                      <Fragment key={starter.name}>
                        <Sprite name={starter.name} number={starter.number} />
                        {index < array.length - 1 && <Divider orientation="vertical" flexItem />}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
