import { Spacer, Text, useTheme, Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0x 20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <NextLink href="/" passHref>
        <Link>
          <Image
            alt="gif app"
            width={70}
            height={70}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/52.svg"
          />
        </Link>
      </NextLink>
      <NextLink href="/" passHref>
        <Link>
          <Image alt="pokemon logo" src="/logo.png" width={230} height={80} />
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />
      <NextLink href="/favorites" passHref>
        <Link>
          <Text color="white" css={{ marginRight: 16 }}>
            Favorites
          </Text>
        </Link>
      </NextLink>
    </div>
  );
};
