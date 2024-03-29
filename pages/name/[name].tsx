import { useState } from "react";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import confetti from "canvas-confetti";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { localFavorites } from "../../utils";
interface Props {
  pokemon: Pokemon;
}
const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const { name, sprites, id } = pokemon;
  const { existInFavorites, toggleFavorite } = localFavorites;
  const [isInFavorites, setIsInFavorites] = useState(existInFavorites(id));
  const onToggleFavorite = () => {
    toggleFavorite(id);
    setIsInFavorites(!isInFavorites);
    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };
  return (
    <Layout title={name.toUpperCase()}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  sprites.other?.dream_world?.front_default ||
                  sprites.front_default
                }
                alt={name}
                height={200}
                width={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {name}
              </Text>
              <Button
                onPress={onToggleFavorite}
                color="gradient"
                ghost={!isInFavorites}
                shadow
              >
                {isInFavorites ? "Saved" : "Save to favorites"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={20}>Sprites</Text>
              <Container direction="row" display="flex">
                <Image
                  src={sprites.front_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.front_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// getstaticpaths is a function that is called when the page is loaded
// and it is used to fetch data from the server
export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { results },
  } = (await pokeApi.get<PokemonListResponse>("/pokemon?limit=200")) || {};
  return {
    paths: (results || []).map(({ name = "" }) => ({ params: { name } })),
    // can be used to generate pages on demand
    fallback: 'blocking',
  };
};

// getstaticprops is a function that is called when the page is loaded
// and it is used to fetch data from the server
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params || {};
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);
  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  }
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    };
  }
  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};
export default PokemonByNamePage;
