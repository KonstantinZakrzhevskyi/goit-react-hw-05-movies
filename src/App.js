import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Navigation from 'componrnts/Navigation';
import Loader from 'componrnts/Loader';
import Container from 'componrnts/Container';

import './App.css';

const HomePage = lazy(() => import('./views/HomePage/HomePage'));

const MoviesPage = lazy(() => import('./views/MoviesPage/MoviesPage'));

const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage/MovieDetailsPage'),
);

const Cast = lazy(() => import('./componrnts/Cast/Cast'));

const Reviews = lazy(() => import('./componrnts/Reviews/Reviews'));

function App() {
  return (
    <>
      <Navigation />
      <Container>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
