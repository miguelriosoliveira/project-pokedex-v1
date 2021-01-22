import React from 'react';

export default function Sprite({ name, number, ...props }) {
  number = number.toString().padStart(3, '0');
  return (
    <img
      src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`}
      alt={name}
      {...props}
    />
  );
}
