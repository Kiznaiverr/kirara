export type Game = "zzz";

export function getApiBaseUrl(game: Game): string {
  switch (game) {
    case "zzz":
      return "https://enka.network/api/zzz/uid"; // Placeholder
    default:
      throw new Error(`Unsupported game: ${game}`);
  }
}

export function getCardsBaseUrl(game: Game): string {
  switch (game) {
    case "zzz":
      return "https://cards.enka.network/u/zzz"; // Placeholder
    default:
      throw new Error(`Unsupported game: ${game}`);
  }
}
