export type Game = "genshin";

export function getApiBaseUrl(game: Game): string {
  return "https://enka.network/api/uid";
}

export function getCardsBaseUrl(game: Game): string {
  return "https://cards.enka.network/u";
}
