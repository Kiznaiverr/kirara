import axios from "axios";
import { PlayerData } from "../types";

export class EnkaClient {
  async getPlayerData(uid: string): Promise<PlayerData> {
    const url = `https://enka.network/api/uid/${uid}?info`;
    const response = await axios.get<PlayerData>(url);
    return response.data;
  }
}
