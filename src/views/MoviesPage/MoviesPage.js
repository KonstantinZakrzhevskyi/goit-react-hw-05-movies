import { useState, useEffect } from 'react';

import * as fetchAPI from '../../ApiService/ApiService';
import { Status } from '../../utils/status';
import SearchForm from 'componrnts/SearchForm';
import Gallery from 'componrnts/Gallery';
import IdleView from 'componrnts/IdleView';
import ErrorView from 'componrnts/ErrorView';
import Loading from 'componrnts/Loader/Loader';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './MoviesPage.module.css';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!query) return;
    setStatus(Status.PENDING);

    fetchAPI
      .fetchSearchMovies(query)
      .then(data => {
        if (data.length === 0) {
          throw new Error();
        }
        setMovies(data.results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [query]);

  const onSubmit = query => {
    setQuery(query);
  };

  if (status === Status.IDLE) {
    return (
      <>
        <SearchForm onSubmit={onSubmit} />
        <IdleView />
      </>
    );
  }

  if (status === Status.PENDING) {
    return <Loading />;
  }

  if (status === Status.RESOLVED) {
    return (
      <div className={s.moviesPage}>
        <SearchForm onSubmit={onsubmit} />
        <Gallery movies={movies} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={'No results were found for your search'} />;
  }
}

export default MoviesPage;
