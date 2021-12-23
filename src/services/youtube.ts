import axios from "axios";

export class Youtube {
  private key;
  private youtube;
  constructor(key: string) {
    this.key = key;
    this.youtube = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key },
    });
  }

  async mostPopular() {
    const response = await this.youtube.get("videos", {
      params: {
        part: "snippet",
        maxResults: 25,
        regionCode: "kr",
        chart: "mostPopular",
      },
    });
    return response?.data?.items ?? [];
  }

  async search(query: string) {
    const response: any = await this.youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 25,
        type: "video",
        q: query,
      },
    });
    return response?.items.map((item: any) => ({
      ...item,
      id: item.id.videoId,
    }));
  }
}
