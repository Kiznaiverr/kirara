import { getApiBaseUrl as getGenshinApiBaseUrl } from "./genshin";
import { getApiBaseUrl as getHsrApiBaseUrl } from "./hsr";
import { getApiBaseUrl as getZzzApiBaseUrl } from "./zzz";
import { getCardsBaseUrl as getGenshinCardsBaseUrl } from "./genshin";
import { getCardsBaseUrl as getHsrCardsBaseUrl } from "./hsr";
import { getCardsBaseUrl as getZzzCardsBaseUrl } from "./zzz";

export type Game = "genshin" | "hsr" | "zzz" | (string & {});

export function getApiBaseUrl(game: Game): string {
  switch (game) {
    case "genshin":
      return getGenshinApiBaseUrl(game as "genshin");
    case "hsr":
      return getHsrApiBaseUrl(game as "hsr");
    case "zzz":
      return getZzzApiBaseUrl(game as "zzz");
    default:
      throw new Error(`Unsupported game: ${game}`);
  }
}

export function getCardsBaseUrl(game: Game): string {
  switch (game) {
    case "genshin":
      return getGenshinCardsBaseUrl(game as "genshin");
    case "hsr":
      return getHsrCardsBaseUrl(game as "hsr");
    case "zzz":
      return getZzzCardsBaseUrl(game as "zzz");
    default:
      throw new Error(`Unsupported game: ${game}`);
  }
}
