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

export interface TEXT_TYPE {
  [key: number]: { text: string; color: string };
}

export interface TEXT_BOUNDARY {
  right: number;
  bottom: number;
}

export type INPUT_TYPE = number[];
