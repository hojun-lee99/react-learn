import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import instance from '../../api/axios';
import type { Movie } from '../../types';
import './SearchPage.css';

export default function SearchPage() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const qeury = useQuery();
  const searchTerm = qeury.get('q');

  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm: string) => {
    try {
      const request = await instance.get(
        `/search/multi?include_adult=false&query=${searchTerm}`,
      );
      setSearchResults(request.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie: Movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl =
              'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <div className="movie">
                <div className="movie_column-poster">
                  <img src={movieImageUrl} alt="" className="movie_poster" />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results_text">
          <p>Your search for "{searchTerm}" did not have any matches.</p>
          <p>Suggestions:</p>
          <ul>
            <li>Try different keywords</li>
          </ul>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
