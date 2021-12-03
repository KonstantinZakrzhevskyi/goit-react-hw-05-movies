import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as fetchAPI from '../../ApiService/ApiService';
import { URL } from '../../ApiService/settingsUrl';
import defaultAvatar from './defaultAvatar.png';

import { Status } from '../../utils/status';
import IdleView from 'componrnts/IdleView';
import ErrorView from 'componrnts/ErrorView';
import Loading from 'componrnts/Loader/Loader';

import s from './Cast.module.css';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    fetchAPI
      .fetchMovieCast({ movieId })
      .then(data => {
        setCast(data.cast);
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

  if (status === Status.RESOLVED) {
    return (
      <>
        {cast && (
          <>
            <ul className={s.cast}>
              {cast.map(actor => (
                <li className={s.castItem} key={actor.id}>
                  <img
                    className={s.castImage}
                    src={
                      actor.profile_path
                        ? `${URL.IMAGE}${actor.profile_path}`
                        : defaultAvatar
                    }
                    alt={actor.name}
                    width="200"
                  />
                  <h3 className={s.castTitle}>{actor.name}</h3>
                  <p className={s.castText}>Character: {actor.character}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={'No results were found for your search'} />;
  }
}

export default Cast;
