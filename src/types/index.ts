export type Game = "genshin" | "hsr" | "zzz" | (string & {});

export interface Avatar {
  avatarId: string;
  level: number;
  talentLevel?: number;
  energyType?: number;
}

export interface PlayerInfo {
  nickname: string;
  level: number;
  signature: string;
  worldLevel: number;
  nameCardId: number;
  finishAchievementNum: number;
  towerFloorIndex: number;
  towerLevelIndex: number;
  isShowAvatarTalent?: boolean;
  theaterActIndex?: number;
  theaterModeIndex?: number;
  theaterStarIndex?: number;
  fetterCount?: number;
  towerStarIndex?: number;
  stygianIndex?: number;
  stygianSeconds?: number;
  stygianId?: number;
  showAvatarInfoList: Avatar[];
}

export interface GenshinPlayerData {
  game: "genshin";
  playerInfo: PlayerInfo;
}

export interface HsrPlayerInfo {
  uid: number;
  nickname: string;
  level: number;
  headIcon: number;
  platform: string;
  recordInfo: {
    achievementCount: number;
    avatarCount: number;
    equipmentCount: number;
  };
  personalCardId: number;
  avatarDetailList: HsrAvatar[];
}

export interface HsrAvatar {
  avatarId: number;
  level: number;
  // Placeholder for other fields
}

export interface HsrPlayerData {
  game: "hsr";
  detailInfo: HsrPlayerInfo;
}

export interface SimplifiedPlayerData {
  // Genshin fields
  nickname?: string;
  level?: number;
  signature?: string;
  worldLevel?: number;
  nameCardId?: number;
  finishAchievementNum?: number;
  towerFloorIndex?: number;
  towerLevelIndex?: number;
  fetterCount?: number;
  towerStarIndex?: number;
  stygianIndex?: number;
  stygianSeconds?: number;
  stygianId?: number;
  avatarIds?: string[];
  defaultAvatarId?: string | null;
  cardUrl?: string | null;
  // HSR fields
  platform?: string;
  recordInfo?: {
    achievementCount: number;
    avatarCount: number;
    equipmentCount: number;
  };
  uid?: number;
  region?: string;
  avatarId?: string | null;
}

export interface CardOptions {
  lang?: string;
  substats?: boolean;
  subsBreakdown?: boolean;
  uid?: boolean;
  hideNames?: boolean;
}

export interface ZzzPlayerData {
  game: "zzz";
  // Placeholder
}

export type PlayerData = GenshinPlayerData | HsrPlayerData | ZzzPlayerData;
