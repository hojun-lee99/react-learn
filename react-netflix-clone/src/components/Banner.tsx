import { useEffect, useState } from 'react';
import requests from '../api/requests';
import instance from '../api/axios';
import './Banner.css';
import styled from 'styled-components';
import { type Movie } from '../types';

function truncate(str: string | undefined, n: number) {
  if (!str) {
    return '';
  }
  return str?.length > n ? str.substring(0, n) + '...' : str;
}

export default function Banner() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isClicked, setIsClicked] = useState(false);

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

  const backgroundImageUrl = movie?.backdrop_path
    ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : undefined;

  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: backgroundImageUrl,
          backgroundColor: backgroundImageUrl ? 'transparent' : '#111',
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
            <button
              className="banner_button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner_button info">
              <div className="space"></div> More Information
            </button>
          </div>
          {/**DIV > 2 BUTTONS */}
          <h1 className="banner_description">
            {truncate(movie?.overview, 100)}
          </h1>
          {/**Description */}
        </div>
      </header>
    );
  } else {
    const trailer = movie?.videos?.results.find(
      (vid) => vid.type === 'Trailer',
    );

    const videoKey = trailer?.key;

    return (
      <Container>
        <HomeContainer>
          {videoKey ? (
            <Iframe
              src={`https://www.youtube.com/embed/${videoKey}?mute=1&autoplay=1&loop=1&playlist=${videoKey}`}
              width="1280"
              height="720"
              allow="autoplay; fullscreen"
            ></Iframe>
          ) : (
            <div>트레일러 영상 없음</div>
          )}
        </HomeContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
