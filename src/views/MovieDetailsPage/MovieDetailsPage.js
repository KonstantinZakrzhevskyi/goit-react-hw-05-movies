import { useState, useEffect } from 'react';
import {
  NavLink,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import * as featchAPI from '../../ApiService/ApiService';
import { URL } from '../../ApiService/settingsUrl';

import { Status } from '../../utils/status';
import IdleView from 'componrnts/IdleView';
import ErrorView from 'componrnts/ErrorView';
import Loading from 'componrnts/Loader/Loader';

import defaultImage from './defaultImage.png';
import s from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(Status.PENDING);

    featchAPI
      .fetchMovieDetails(movieId)
      .then(data => {
        setMovie(data);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  if (status === Status.IDLE) {
    return <IdleView />;
  }

  if (status === Status.PENDING) {
    return <Loading />;
  }

  const onGoBack = () => {
    navigate(location?.state?.from ?? '/');
  };

  if (status === Status.RESOLVED) {
    return (
      <>
        {movie && (
          <>
            <button className={s.button} type="button" onClick={onGoBack}>
              Go back
            </button>
            <div className={s.movieCard}>
              <img
                className={s.movieCardImage}
                src={
                  movie.poster_path
                    ? `${URL.IMAGE}${movie.poster_path}`
                    : defaultImage
                }
                alt={movie.title || movie.name}
              ></img>
              <div className={s.description}>
                <h2 className={s.movieTitle}>
                  {movie.title || movie.name} ({movie.release_date.slice(0, 4)})
                </h2>
                <h3 className={s.movieSubtitle}>Score </h3>
                <p className={s.movieText}>{movie.vote_average}</p>
                <h3 className={s.movieSubtitle}>Genres</h3>
                <ul className={s.movieList}>
                  {movie.genres.map(({ id, name }) => (
                    <li className={s.movieItem} key={id}>
                      {name}
                    </li>
                  ))}
                </ul>
                <h3 className={s.movieSubtitle}>Overview</h3>
                <p className={s.movieText}>{movie.overview}</p>
              </div>
            </div>
          </>
        )}
        <hr />
        <div className={s.movieInfo}>
          <h3 className={s.movieSubtitle}>Additional information</h3>
          <NavLink
            to="cast"
            className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          >
            Reviews
          </NavLink>
        </div>
        <hr />
        <Outlet />
      </>
    );
  }
  if (status === Status.REJECTED) {
    return <ErrorView message={'No results were found for your search'} />;
  }
}

export default MovieDetailsPage;
