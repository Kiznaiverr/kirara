import { EnkaClient } from "./client/enkaClient";
import { CardsClient } from "./client/cardsClient";
import { PlayerData, CardOptions } from "./types";

export class Kirara {
  private enkaClient = new EnkaClient();
  private cardsClient = new CardsClient();

  async getPlayerData(uid: string): Promise<PlayerData> {
    return this.enkaClient.getPlayerData(uid);
  }

  async getAvatarList(uid: string): Promise<string[]> {
    const data = await this.getPlayerData(uid);
    return data.playerInfo.showAvatarInfoList.map((avatar) =>
      avatar.avatarId.toString(),
    );
  }

  async getDefaultAvatarId(uid: string): Promise<string | null> {
    const avatars = await this.getAvatarList(uid);
    return avatars.length > 0 ? avatars[0] : null;
  }

  generateCardUrl(
    uid: string,
    avatarId: string,
    options?: CardOptions,
  ): string {
    return this.cardsClient.generateCardUrl(uid, avatarId, options);
  }

  async generateCardImage(
    uid: string,
    avatarId: string,
    options?: CardOptions,
  ): Promise<Buffer> {
    return this.cardsClient.generateCardImage(uid, avatarId, options);
  }

  async generateDefaultCardUrl(
    uid: string,
    options?: CardOptions,
  ): Promise<string | null> {
    const avatarId = await this.getDefaultAvatarId(uid);
    return avatarId ? this.generateCardUrl(uid, avatarId, options) : null;
  }

  async generateDefaultCardImage(
    uid: string,
    options?: CardOptions,
  ): Promise<Buffer | null> {
    const avatarId = await this.getDefaultAvatarId(uid);
    return avatarId ? this.generateCardImage(uid, avatarId, options) : null;
  }
}
