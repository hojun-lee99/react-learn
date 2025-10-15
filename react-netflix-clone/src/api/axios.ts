import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.themovie.org/3',
  params: {
    api: import.meta.env.VITE_TMDB_API_KEY,
    langueue: 'ko-KR',
  },
});

export default instance;
