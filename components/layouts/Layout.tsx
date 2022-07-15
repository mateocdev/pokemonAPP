import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";
interface LayoutProps {
  title?: string;
}
export const Layout: FC = ({ children, title }: LayoutProps) => {
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
