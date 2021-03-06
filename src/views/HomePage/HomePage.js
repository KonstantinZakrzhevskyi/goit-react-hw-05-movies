import { useState, useEffect } from 'react';

import * as fetchAPI from '../../ApiService/ApiService';

import { Status } from '../../utils/status';
import Gallery from 'componrnts/Gallery';
import IdleView from 'componrnts/IdleView';
import ErrorView from 'componrnts/ErrorView';
import Loading from 'componrnts/Loader/Loader';

import s from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    fetchAPI
      .fetchTrending()
      .then(data => {
        setMovies(data.results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, []);

  if (status === Status.IDLE) {
    return <IdleView />;
  }

  if (status === Status.PENDING) {
    return <Loading />;
  }

  if (status === Status.RESOLVED) {
    return (
      <div className={s.homePage}>
        <h2 className={s.homePageTitle}>Trending today</h2>

        {movies && <Gallery movies={movies} />}
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={'No results were found for your search'} />;
  }
}

export default HomePage;
