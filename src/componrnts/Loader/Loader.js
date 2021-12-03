import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

const Loading = () => {
  return (
    <div className={s.loader}>
      <Loader
        type="Rings"
        color="rgba(27, 76, 238, 0.966)"
        height={400}
        width={400}
        timeout={3000}
      />
    </div>
  );
};

export default Loading;
