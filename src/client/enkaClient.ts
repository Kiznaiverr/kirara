import axios from "axios";
import { PlayerData, Game } from "../types";
import { getApiBaseUrl } from "../game";

export class EnkaClient {
  async getPlayerData(uid: string, game: Game): Promise<PlayerData> {
    const baseUrl = getApiBaseUrl(game);
    let url: string;
    switch (game) {
      case "genshin":
        url = `${baseUrl}/${uid}?info`;
        break;
      case "hsr":
        url = `${baseUrl}/${uid}`;
        break;
      case "zzz":
        url = `${baseUrl}/${uid}`; // Placeholder
        break;
      default:
        throw new Error(`Unsupported game: ${game}`);
    }
    const response = await axios.get(url);
    return { ...response.data, game };
  }
}
