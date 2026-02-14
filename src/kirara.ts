import { EnkaClient } from "./client/enkaClient";
import { CardsClient } from "./client/cardsClient";
import {
  PlayerData,
  CardOptions,
  Game,
  GenshinPlayerData,
  HsrPlayerData,
} from "./types";

export class Kirara {
  private game: Game;
  private enkaClient = new EnkaClient();
  private cardsClient = new CardsClient();

  constructor(game: Game) {
    if (!game) throw new Error("Game is required");
    this.game = game;
  }

  async getPlayerData(uid: string): Promise<PlayerData> {
    return this.enkaClient.getPlayerData(uid, this.game);
  }

  async getAvatarList(uid: string): Promise<string[]> {
    const data = await this.getPlayerData(uid);
    switch (this.game) {
      case "genshin":
        const genshinData = data as GenshinPlayerData;
        return genshinData.playerInfo.showAvatarInfoList.map((avatar) =>
          avatar.avatarId.toString(),
        );
      case "hsr":
        const hsrData = data as HsrPlayerData;
        return hsrData.detailInfo.avatarDetailList.map((avatar) =>
          avatar.avatarId.toString(),
        );
      case "zzz":
        // Placeholder
        return [];
      default:
        throw new Error(`Unsupported game: ${this.game}`);
    }
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
    return this.cardsClient.generateCardUrl(uid, avatarId, options, this.game);
  }

  async generateCardImage(
    uid: string,
    avatarId: string,
    options?: CardOptions,
  ): Promise<Buffer> {
    return this.cardsClient.generateCardImage(
      uid,
      avatarId,
      options,
      this.game,
    );
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
