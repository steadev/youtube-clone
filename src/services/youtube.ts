import axios from "axios";

export class Youtube {
  private youtube;
  private mostPopularPageToken: string | undefined;
  private videoList: any[] = [];

  constructor(key: string) {
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
        pageToken: this.mostPopularPageToken,
      },
    });
    this.mostPopularPageToken = response.data.nextPageToken;
    const result = response?.data?.items ?? [];
    this.videoList = [...this.videoList, ...result];
    return result;
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
    const result = response?.data?.items.map((item: any) => ({
      ...item,
      id: item.id.videoId,
    }));
    this.videoList = [...this.videoList, ...result];
    return result;
  }

  getDate(data: string): string {
    const date = new Date(data);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
  }
}
