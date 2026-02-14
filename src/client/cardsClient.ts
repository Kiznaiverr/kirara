import axios from "axios";
import { CardOptions, Game } from "../types";
import { getCardsBaseUrl } from "../game";

export class CardsClient {
  generateCardUrl(
    uid: string,
    avatarId: string,
    options?: CardOptions,
    game: Game = "genshin",
  ): string {
    const baseUrl = getCardsBaseUrl(game);
    let url = `${baseUrl}/${uid}/${avatarId}/image`;
    if (options) {
      const params = new URLSearchParams();
      if (options.lang) params.append("lang", options.lang);
      if (options.substats !== undefined)
        params.append("substats", options.substats.toString());
      if (options.subsBreakdown !== undefined)
        params.append("subsBreakdown", options.subsBreakdown.toString());
      if (options.uid !== undefined)
        params.append("uid", options.uid.toString());
      if (options.hideNames !== undefined)
        params.append("hideNames", options.hideNames.toString());
      const query = params.toString();
      if (query) url += `?${query}`;
    }
    return url;
  }

  async generateCardImage(
    uid: string,
    avatarId: string,
    options?: CardOptions,
    game: Game = "genshin",
  ): Promise<Buffer> {
    const url = this.generateCardUrl(uid, avatarId, options, game);
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
  }
}
