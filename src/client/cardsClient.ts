import axios from "axios";
import { CardOptions } from "../types";

export class CardsClient {
  generateCardUrl(
    uid: string,
    avatarId: string,
    options?: CardOptions,
  ): string {
    let url = `https://cards.enka.network/u/${uid}/${avatarId}/image`;
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
  ): Promise<Buffer> {
    const url = this.generateCardUrl(uid, avatarId, options);
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
  }
}
