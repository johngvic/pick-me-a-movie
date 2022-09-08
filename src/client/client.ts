import { Movie } from '../interfaces/Movie';
import { Provider, ProviderInfo } from '../interfaces/Provider';
import config from '../config';

interface InfoProps {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}

const token = config.TMDB_TOKEN;
const baseUrl = config.TMDB_BASE_URL;
const moviesArray: Movie[] = [];

export const loadMovies = async (): Promise<void> => {
  const randomPages: number[] = []
  
  //limitado a uma página somente por enquanto, porém, quanto maior a qtde de filmes que se deseja, maior esse nro
  for (let page = 0; page < 1; page++) {
    let newRandomPage = Math.floor(Math.random() * 100) + 1;

    // eslint-disable-next-line
    while(randomPages.some(page => page === newRandomPage)) {
      newRandomPage = Math.floor(Math.random() * 100) + 1;
    }

    randomPages.push(newRandomPage)
  }

  for (let pageIndex = 0; pageIndex < randomPages.length; pageIndex++) {
    const fetchedMovies: InfoProps = 
      await fetchItem(`/movie/popular?api_key=${token}&page=${randomPages[pageIndex]}&language=pt-BR`);
    
    fetchedMovies.results.forEach((movie) => {
      moviesArray.push(movie)
    })
  }
}

export const getRandomMovie = (): Movie => {
  const randomMovieIndex = Math.floor(Math.random() * moviesArray.length)
  return moviesArray[randomMovieIndex];
}

export const getMoviesArrayLength = () => {
  return moviesArray.length;
}

const fetchItem = async (endpoint: string): Promise<InfoProps> => {
  const request = await fetch(`${baseUrl}${endpoint}`);
  const json = await request.json();

  return json;
}

export const fetchWatchProviders = async (movieId: number): Promise<ProviderInfo[]> => {
  const request = await fetch(`${baseUrl}/movie/${movieId}/watch/providers?api_key=${token}`);
  const json: Provider = await request.json();
  const providers: ProviderInfo[] = [];

  json.results.BR?.flatrate?.forEach(flatrate => providers.push({
    name: flatrate.provider_name,
    logoPath: flatrate.logo_path
  }));
  
  return providers;
}