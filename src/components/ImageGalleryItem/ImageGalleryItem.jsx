import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallPicture, alt, onClick, largeImage }) => {
  return (
    <li className={css.galleryItem} onClick={() => onClick(largeImage)}>
      <img src={smallPicture} alt={alt} className={css.galleryImg} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallPicture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
