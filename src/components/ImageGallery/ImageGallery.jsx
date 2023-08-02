import { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    showModal: false,
    largeImageURL: null,
  };

  handleImageClick = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL,
    });
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { galleryItems } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <ul className={css.gallery}>
          {galleryItems.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                smallPicture={webformatURL}
                alt={tags}
                onClick={this.handleImageClick}
                largeImage={largeImageURL}
              />
            );
          })}
        </ul>
        {showModal && (
          <Modal
            largeImage={this.state.largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;
