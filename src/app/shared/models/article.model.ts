export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IArticle[];
}

export interface IArticle {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  published_at: Date;
}
