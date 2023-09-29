import axios from "axios";

export interface IVideoDetailsResponse {
  iframe?: string;
  labels: ILabels[];
  sizes?: string[];
  error?: string;
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

    return response;
  } catch (error) {}
};

interface ISearchResponse {
  results: IResult[];
}
export interface IResult {
  link: string;
  title: string;
  description: string;
  thumbnails: {
    high: {
      url: string;
    };
  };
}
export const searchData = async (searchTerm: string) => {
  try {
    const response = await axios.get<ISearchResponse>(
      `/api/search?keyword=${searchTerm}`
    );
    console.log(response);
    if (response.data) {
      return response.data;
    }
  } catch (error) {}
};
