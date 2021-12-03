import searchMovies from './searchMovies.png';
import s from './IdleView.module.css';

function IdleView() {
  return (
    <div className={s.idleView} role="alert">
      <img src={searchMovies} alt="SearchMovies" width="600" />
    </div>
  );
}

export default IdleView;
