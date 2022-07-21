import type { NextPage } from "next";
import { Grid } from "@nextui-org/react";
import { Layout } from "../components/layouts";
import { GetStaticProps } from "next";
import pokeApi from "../api/pokeApi";
import { PokemonListResponse } from "../interfaces";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokemon List">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

// getstaticprops is a function that is called when the page is loaded
// and it is used to fetch data from the server
export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { results },
  } = (await pokeApi.get<PokemonListResponse>("/pokemon?limit=151")) || {};
  // console.log(results);
  const pokemons: SmallPokemon[] = results.map(
    ({ name = "", url = "" }, id) => ({
      name,
      url,
      id: id + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        id + 1
      }.svg`,
    })
  );
  console.log(pokemons);
  return {
    props: {
      pokemons,
    },
  };
};
export default HomePage;
