import React, { FC } from "react";
import { Card, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  id: number;
}
export const FavoriteCardPokemon: FC<Props> = ({ id }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/`);
  };
  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id} >
      <Card isHoverable isPressable css={{ padding: 10 }} onPress={onClick}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
};
