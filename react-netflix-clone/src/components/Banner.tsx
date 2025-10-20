import { useEffect, useState } from 'react';
import requests from '../api/requests';
import instance from '../api/axios';
import './Banner.css';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
}

export default function Banner() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const request = await instance.get(requests.fetchNowPlaying);
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    const { data: movieDetail } = await instance.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });

    setMovie(movieDetail);
  }

  function truncate(str: string | undefined, n: number) {
    if (!str) {
      console.log('truncate: str is undefined!');
      return;
    }
    return str?.length > n ? str.substring(0, n) : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
      }}
    >
      <div className="banner_contents">
        {/**TItle */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button info">
            <div className="space"></div> More Information
          </button>
        </div>
        {/**DIV > 2 BUTTONS */}
        <h1 className="banner_description">{truncate(movie?.overview, 10)}</h1>
        {/**Description */}
      </div>
    </header>
  );
}
