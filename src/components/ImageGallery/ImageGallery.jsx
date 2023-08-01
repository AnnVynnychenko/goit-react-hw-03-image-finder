import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import LoadMoreBtn from 'components/LoadMoreBtn';
import Modal from 'components/Modal';

const perPage = 12;
const API_KEY = '37391031-3c842063259c869251b7769d0';
const BASE_URL = 'https://pixabay.com/api/';

class ImageGallery extends Component {
  state = {
    galleryItems: [],
    status: null,
    page: 1,
    loadMore: false,
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.props;
    if (prevProps.searchQuery !== searchQuery) {
      this.resetPage();
    }
    if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const response = await fetch(
          `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
        );
        const parseResponse = await response.json();
        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...parseResponse.hits],
          status: 'resolved',
          loadMore: page < Math.ceil(parseResponse.totalHits / 12),
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  handleIncrementPage = () => {
    const { incrementPage } = this.props;
    incrementPage();
  };

  resetPage() {
    this.setState({ galleryItems: [], page: 1 });
  }

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
    const { galleryItems, status, loadMore, showModal } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return toast.error('Oops, something went wrong! Please, try again!');
    }

    if (status === 'resolved') {
      if (galleryItems.length === 0) {
        const { searchQuery } = this.props;
        return toast.error(
          `Sorry, there are no images matching search query ${searchQuery}. Please try again.`
        );
      }
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
          {loadMore && <LoadMoreBtn onClick={this.handleIncrementPage} />}
        </>
      );
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number.isRequired,
  incrementPage: PropTypes.func.isRequired,
};
