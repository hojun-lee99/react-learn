export interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
  poster_path?: string; // Row.tsx에서 필요
  videos?: {
    // Banner.tsx에서 필요
    results: {
      key: string;
      type: string;
    }[];
  };
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  media_type?: string;
}
