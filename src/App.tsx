import { Header } from './components/header';
import { Content, EmptyContent } from './components/content';
import { useEffect, useState } from 'react';
import { getMoviesArrayLength, loadMovies, fetchWatchProviders } from './client/client'
import { Movie } from './interfaces/Movie';
import { ProviderInfo } from './interfaces/Provider';
import { ReactComponent as Shuffle } from './assets/shuffle.svg';
import styled from 'styled-components';
import { MovieStore } from './store/MovieStore';
import { Providers } from './components/providers';
import { Box, Modal, Typography } from '@mui/material';

const movieStore = new MovieStore([]);

function App() {
  useEffect(() => {
    loadMovies()
  }, [])

  const [movie, setMovie] = useState<Movie>({ title: '' } as Movie);
  const [moviePosterPath, setMoviePosterPath] = useState('');
  const [movieProviders, setMovieProviders] = useState<ProviderInfo[]>([] as ProviderInfo[])
  const [modalVisibility, setModalVisibility] = useState(false);

  const renderNewMovie = () => {
    if (movieStore.getMoviesShownLength() === getMoviesArrayLength()) {
      setModalVisibility(true);
    } else {
      movieStore.setNewMovie()
      setTimeout(async () => {
        const lastInserted = movieStore.getMovies()[movieStore.getMoviesShownLength() - 1];

        setMovie(lastInserted.movie);
        setMoviePosterPath(lastInserted.posterPath);
        setMovieProviders(await fetchWatchProviders(lastInserted.movie.id))
      }, 1000)
    }
  }

  return (
    <div className="App">
      <Header />

      <Modal
        open={modalVisibility}
        onClose={() => setModalVisibility(false)}
      >
        <Box sx={style}>
          <Typography style={titleTextStyle} variant="h4" component="h4">
            Limite atingido
          </Typography>
          <Typography style={descriptionTextStyle} sx={{ mt: 8 }}>
            Você atingiu o limite máximo de filmes permitidos!
            Recarregue a página para ver mais.
          </Typography>
        </Box>
      </Modal>
      
      {
        movie.title === '' ?
        <EmptyContent /> :
        <>
          <Content
            movie={ movie }
            moviePosterPath={ moviePosterPath }
          />
          <Providers movieProviders={movieProviders} />
        </>
      }

      <Footer>
        <Button onClick={renderNewMovie}>
          <Icon />
          <ButtonText>Encontrar filme</ButtonText>
        </Button>
      </Footer>
    </div>
  );
}

export default App;

const Footer = styled.div`
  margin-top: 2.5rem;
  justify-content: center;
`

const Button = styled.div`
  cursor: pointer;
  background-color: white;
  border-radius: 5px;
  width: 180.98px;
  height: 3.5rem;
  position: relative;
  white-space: nowrap;
  display: flex;
  margin: 0 auto;
  padding: 0 5px;
  opacity: 0.8;
  transition: all 300ms ease-out;

  &:hover{
    opacity: 1;
  }
`

const Icon = styled(Shuffle)`
  width: 2rem;
  height: 2rem;
  margin: 0 0 0 .5rem;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
`

const ButtonText = styled.p`
  color: black;
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 0 1.2rem;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '30rem',
  height: '13rem',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#092479',
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '.8rem',
  border: '1px solid white',
};

const titleTextStyle = {
  color: 'white',
  fontFamily: 'Poppins',
  fontWeight: '500'
}

const descriptionTextStyle = {
  color: 'white',
  fontFamily: 'Poppins',
  fontSize: '16px',
  fontWeight: '500'
}