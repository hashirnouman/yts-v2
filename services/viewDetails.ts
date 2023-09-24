import axios from "axios";

export interface IVideoDetailsResponse {
  iframe?: string;
  labels: ILabels[];
  sizes: string[];
}
export interface ILabels {
  qualityLabel: string;
  hasAudio: boolean;
}

export const videoDetails = async (link: string) => {
  try {
    const response = await axios.post<IVideoDetailsResponse>("/api/view", {
      link,
    });
    return response.data;
  } catch (error) {}
};
