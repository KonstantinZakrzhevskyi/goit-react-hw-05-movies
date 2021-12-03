import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as fetchAPI from '../../ApiService/ApiService';

import { Status } from 'utils/status';
import IdleView from 'componrnts/IdleView';
import ErrorView from 'componrnts/ErrorView';
import Loading from 'componrnts/Loader/Loader';

import s from './Reviews.module.css';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    fetchAPI
      .fetchMovieReviews(movieId)
      .then(data => {
        setReviews(data.results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>Sorry, there is no review for this movie.</p>;
  }

  if (status === Status.IDLE) {
    return <IdleView />;
  }

  if (status === Status.PENDING) {
    return <Loading />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {reviews && (
          <>
            <ul className={s.review}>
              {reviews.map(review => (
                <li className={s.reviewItem} key={review.id}>
                  <h2 className={s.reviewTitle}>Autor: {review.author}</h2>
                  <p className={s.reviewText}>{review.content}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={'No results were found for your search.'} />;
  }
}

export default Reviews;
