import axios from "axios";
import { environment } from "../environment/environment";

export class Youtube {
  constructor(key) {
    this.key = key;
  }

  async mostPopular() {
    let url = `${environment.youtubeApiUrl}/videos?part=snippet&maxResults=25&regionCode=kr&chart=mostPopular&key=${this.key}`;
    // if (pageToken) {
    //   url += `&pageToken=${pageToken}`;
    // }
    const result = await axios.get(url);
    return result?.data?.items ?? [];
  }

  async search(query) {
    let url = `${environment.youtubeApiUrl}/search?part=snippet&maxResult=25&q=${query}&type=video&key=${this.key}`;
    // if (pageToken) {
    //   url += `&pageToken=${pageToken}`;
    // }
    const result = await axios.get(url);
    return result?.items.map((item) => ({ ...item, id: item.id.videoId }));
  }
}
