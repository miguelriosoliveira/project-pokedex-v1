import React, { useState, useEffect, useCallback } from 'react';

import classnames from 'classnames';

import { Typography, Button, InputAdornment, TextField } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';

import api from '../../services/api';
import sources from '../../sources';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

import './PokemonList.css';

export default function PokemonList({ history, match }) {
  const generation = match.params.generationName;

  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPokemons, setTotalPokemons] = useState(0);

  const loadTypes = useCallback(async () => {
    let response = null;
    try {
      response = await api.get(sources.types());
    } catch (error) {
      console.error(error);
      return;
    }
    setTypes(response.data);
  }, []);

  const loadPokemonList = useCallback(
    async (search, types, page, reset = false) => {
      setLoading(true);

      search = search || null;
      setPage(page || 1);
      let response = null;
      try {
        response = await api.get(sources.pokemonList(), {
          params: { generation, search, types, page },
        });
      } catch (error) {
        console.error(error);
        return;
      } finally {
        setLoading(false);
      }

      setPokemonList(prevPokemonList =>
        reset ? response.data : [...prevPokemonList, ...response.data],
      );
      setTotalPokemons(response.headers['x-total-items']);
    },
    [generation],
  );

  useEffect(() => {
    loadTypes();
    loadPokemonList();
  }, [loadPokemonList, loadTypes]);

  function onSubmit(e) {
    e.preventDefault();
    clearTimeout(typingTimeout);
    loadPokemonList(search, selectedTypes, null, true);
  }

  function onChangeSearch({ target: { value: newSearch } }) {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(setTimeout(() => loadPokemonList(newSearch, selectedTypes, null, true), 500));
    setSearch(newSearch);
  }

  function selectType(type) {
    let newSelectedTypes = [...selectedTypes];
    if (newSelectedTypes.includes(type)) {
      newSelectedTypes = newSelectedTypes.filter(type_ => type_ !== type);
    } else {
      newSelectedTypes.push(type);
    }
    setSelectedTypes(newSelectedTypes);
    loadPokemonList(search, newSelectedTypes, null, true);
  }

  function onScroll({ target: element }) {
    if (loading) {
      return;
    }
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 200) {
      loadPokemonList(search, selectedTypes, page + 1);
    }
  }

  return (
    <div className="pokemon-list-component">
      <Button
        variant="contained"
        color="default"
        className="back-button"
        startIcon={<ArrowBackIcon />}
        onClick={history.goBack}
      >
        Back
      </Button>

      <div className="search">
        <form onSubmit={onSubmit}>
          <TextField
            placeholder="Name or Number"
            variant="outlined"
            value={search}
            onChange={onChangeSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: 'gray' }} />
                </InputAdornment>
              ),
            }}
          />
          <Typography>
            <span>Total pokémon found</span>
            <strong>{totalPokemons}</strong>
          </Typography>
        </form>

        <div className="types-menu">
          {types.map(type => (
            <div
              key={type}
              className={classnames(`type type--${type}`, {
                'type--selected': selectedTypes.includes(type),
              })}
              onClick={() => selectType(type)}
            >
              <Typography key={type} variant="overline">
                {type}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <div className="list" onScroll={onScroll}>
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.number} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
