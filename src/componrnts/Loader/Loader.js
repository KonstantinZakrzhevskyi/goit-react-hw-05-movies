import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

const Loading = () => {
  return (
    <div className={s.loader}>
      <Loader
        type="Rings"
        color="#9400d3"
        height={300}
        width={300}
        timeout={3000}
      />
    </div>
  );
};

export default Loading;
