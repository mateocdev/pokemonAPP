import type { NextPage } from "next";
import { Layout } from "../components/layouts";
import { GetStaticProps } from "next";
import pokeApi from '../api/pokeApi';

const HomePage: NextPage = ({ data }) => {
  console.log(data);
  return (
    <Layout title="Pokemon List">
      <ul>Pokemon</ul>
      <ul>Pokemon</ul>
      <ul>Pokemon</ul>
      <ul>Pokemon</ul>
    </Layout>
  );
};

// getstaticprops is a function that is called when the page is loaded
// and it is used to fetch data from the server
export const getStaticProps = async () => {
  const { data: { results } = {} } = await pokeApi.get("/pokemon?limit=151") || {};
  console.log(results);
  return {
    props: {
      data: results,
    },
  }; 
}
export default HomePage;
