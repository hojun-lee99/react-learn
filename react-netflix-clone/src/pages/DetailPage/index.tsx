import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Movie } from '../../types';
import instance from '../../api/axios';

export default function DeatilPage() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
      );
      setMovies(request.data);
    }
    fetchData();
  }, [movieId]);

  if (!movies) return null;
  return (
    <section>
      <img
        className="modal_poster-img"
        src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}}`}
        alt="modal_poster-img"
      />
    </section>
  );
}
