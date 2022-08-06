import React, { FC } from "react";
import { Grid } from "@nextui-org/react";
import { FavoriteCardPokemon } from "../pokemon";

interface Props {
  pokemons: number[];
}
export const FavoritesPokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {(pokemons || []).map((pokemon) => (
        <FavoriteCardPokemon id={pokemon} key={pokemon} />
      ))}
    </Grid.Container>
  );
};
