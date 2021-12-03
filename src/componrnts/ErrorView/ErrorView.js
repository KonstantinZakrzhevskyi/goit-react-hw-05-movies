import PropTypes from 'prop-types';
// import s from './ErrorView.module.css';

function ErrorView(message) {
  return (
    <div>
      <h2>{message}</h2>
      <h2>404 page not found!</h2>
    </div>
  );
}

ErrorView.prototype = {
  message: PropTypes.string.isRequired,
};

export default ErrorView;
