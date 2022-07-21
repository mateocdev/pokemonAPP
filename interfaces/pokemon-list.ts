export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonListResponseResult[];
}

export interface PokemonListResponseResult {
  name: string;
  url: string;
  id: number;
  img: string;
}
