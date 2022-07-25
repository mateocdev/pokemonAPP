import { Grid } from "@nextui-org/react";
import { Layout } from "../components/layouts";
import pokeApi from "../api/pokeApi";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";
import { GetStaticProps, NextPage } from "next";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokedex">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard  key={pokemon.id} pokemon={pokemon} />
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
  } = (await pokeApi.get<PokemonListResponse>("/pokemon?limit=200")) || {};
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
  return {
    props: {
      pokemons,
    },
  };
};
export default HomePage;
