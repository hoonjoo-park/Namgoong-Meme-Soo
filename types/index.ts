export type API_DATA = {
  id: string;
  box_count: number;
  height: number;
  width: number;
  name: string;
  url: string;
};

export type LOCAL_MEME = {
  url: string;
};

export type TEXT_TYPE = {
  top: string;
  middle: string;
  bottom: string;
};

export interface TEXT_BOUNDARY {
  right: number;
  bottom: number;
}
