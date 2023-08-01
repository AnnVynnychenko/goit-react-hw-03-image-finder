import css from './LoadMoreBtn.module.css';
import PropTypes from 'prop-types';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="click" className={css.loadMore} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
