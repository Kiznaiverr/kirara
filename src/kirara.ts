import { EnkaClient } from "./client/enkaClient";
import { CardsClient } from "./client/cardsClient";
import {
  PlayerData,
  CardOptions,
  Game,
  GenshinPlayerData,
  HsrPlayerData,
  ZzzPlayerData,
  SimplifiedPlayerData,
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
        const zzzData = data as ZzzPlayerData;
        return zzzData.PlayerInfo.ShowcaseDetail.AvatarList.map((agent) =>
          agent.Id.toString(),
        );
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

  async getPlayerSummary(
    uid: string,
    options?: CardOptions,
  ): Promise<SimplifiedPlayerData> {
    const data = await this.getPlayerData(uid);
    const avatarIds = await this.getAvatarList(uid);
    const defaultAvatarId = await this.getDefaultAvatarId(uid);
    const cardUrl = defaultAvatarId
      ? this.generateCardUrl(uid, defaultAvatarId, options)
      : null;

    switch (this.game) {
      case "genshin":
        const genshinData = data as GenshinPlayerData;
        return {
          nickname: genshinData.playerInfo.nickname,
          level: genshinData.playerInfo.level,
          signature: genshinData.playerInfo.signature,
          worldLevel: genshinData.playerInfo.worldLevel,
          nameCardId: genshinData.playerInfo.nameCardId,
          finishAchievementNum: genshinData.playerInfo.finishAchievementNum,
          towerFloorIndex: genshinData.playerInfo.towerFloorIndex,
          towerLevelIndex: genshinData.playerInfo.towerLevelIndex,
          theaterActIndex: genshinData.playerInfo.theaterActIndex,
          theaterModeIndex: genshinData.playerInfo.theaterModeIndex,
          theaterStarIndex: genshinData.playerInfo.theaterStarIndex,
          fetterCount: genshinData.playerInfo.fetterCount,
          towerStarIndex: genshinData.playerInfo.towerStarIndex,
          stygianIndex: genshinData.playerInfo.stygianIndex,
          stygianSeconds: genshinData.playerInfo.stygianSeconds,
          stygianId: genshinData.playerInfo.stygianId,
          avatarIds,
          defaultAvatarId,
          cardUrl,
        };
      case "hsr":
        const hsrData = data as HsrPlayerData;
        return {
          platform: hsrData.detailInfo.platform,
          recordInfo: hsrData.detailInfo.recordInfo,
          uid: hsrData.detailInfo.uid,
          level: hsrData.detailInfo.level,
          nickname: hsrData.detailInfo.nickname,
          region: "NA", // Placeholder
          avatarIds,
          avatarId: defaultAvatarId,
          cardUrl,
        } as any; // Temporary cast to avoid type mismatch
      case "zzz":
        const zzzData = data as ZzzPlayerData;
        return {
          uid: zzzData.uid,
          region: zzzData.region,
          signature: zzzData.PlayerInfo.SocialDetail.Desc,
          nickname: zzzData.PlayerInfo.SocialDetail.ProfileDetail.Nickname,
          level: zzzData.PlayerInfo.SocialDetail.ProfileDetail.Level,
          avatarIds,
          defaultAvatarId,
          cardUrl,
        };
      default:
        throw new Error(`Unsupported game: ${this.game}`);
    }
  }
}
