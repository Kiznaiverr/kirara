export type Game = "genshin";

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

export interface PlayerData {
  playerInfo: PlayerInfo;
}

export interface CardOptions {
  lang?: string;
  substats?: boolean;
  subsBreakdown?: boolean;
  uid?: boolean;
  hideNames?: boolean;
}
