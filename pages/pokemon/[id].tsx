import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
interface Props {
  pokemon: Pokemon;
}
const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const { name, sprites, types } = pokemon;

  return (
    <Layout title="PokemonPage">
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
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
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {name}
              </Text>
              <Button color="gradient" ghost>
                Save to favorites
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
  const allPokemon = [
    ...Array(151)
      .fill(1)
      .map((_, i) => `${i}`),
  ];

  return {
    paths: (allPokemon || []).map((id) => ({ params: { id } })),
    fallback: false,
  };
};

// getstaticprops is a function that is called when the page is loaded
// and it is used to fetch data from the server
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || {};
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  return {
    props: {
      pokemon: data,
    },
  };
};
export default PokemonPage;
