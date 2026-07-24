export type ScreenName = "cover" | "story" | "ending" | "poem";

export interface StorySection {
  title: string;
  body: string;
}

export interface PointerState {
  x: number;
  y: number;
}
