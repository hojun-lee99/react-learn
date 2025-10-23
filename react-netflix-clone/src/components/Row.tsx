import { useCallback, useEffect, useState } from 'react';
import instance from '../api/axios';
import { type Movie } from '../types';
import './Row.css';

interface Props {
  title: string;
  fetchUrl: string;
  id: string;
  isLargeRow?: boolean;
}

const BASE_URL = 'https://image.tmdb.org/t/p/original';

export default function Row({ title, fetchUrl, id, isLargeRow }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovieData = useCallback(async () => {
    const request = await instance.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  return (
    <section className="row">
      {/** TITLE */}
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider_arrow-left">
          <span className="arrow">{'<'}</span>
        </div>
        <div id={id} className="row_posters">
          {/**SEVERAL ROW_POSTER */}
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
              src={`${BASE_URL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              loading="lazy"
              alt={movie.name}
            />
          ))}
        </div>
        <div className="slider_arrow-right">
          <span className="arrow">{'>'}</span>
        </div>
      </div>
    </section>
  );
}
