export type Game = "hsr";

export function getApiBaseUrl(game: Game): string {
  switch (game) {
    case "hsr":
      return "https://enka.network/api/hsr/uid";
    default:
      throw new Error(`Unsupported game: ${game}`);
  }
}

export function getCardsBaseUrl(game: Game): string {
  switch (game) {
    case "hsr":
      return "https://cards.enka.network/hsr";
    default:
      throw new Error(`Unsupported game: ${game}`);
  }
}
