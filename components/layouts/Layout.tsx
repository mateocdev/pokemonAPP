import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";
interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}
const origin = typeof window !== "undefined" ? window.location.origin : "";
export const Layout: FC<LayoutProps> = ({ children, title }) => {
  
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="MATEOCDDEV" />
        <meta
          name="description"
          content={`Information about the pokemon ${title}`}
        />
        <meta
          name="keywords"
          content={`pokemon, information, react, nextjs, ${title}, pokedex`}
        />
        <meta property="og:title" content={`Information about pokemons, this is a pokedex - ${title}`} />
        <meta property="og:image" content={`${origin}/image/banner.png`} />
        <meta property="og:description" content={`This is the page about ${title}.`} />
      </Head>
      <Navbar />
      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
