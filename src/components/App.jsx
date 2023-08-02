import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoadMoreBtn from './LoadMoreBtn';
import Loader from './Loader';

const perPage = 12;
const API_KEY = '37391031-3c842063259c869251b7769d0';
const BASE_URL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    searchQuery: '',
    galleryItems: [],
    page: 1,
    loadMore: false,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.resetPage();
    }
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const response = await fetch(
          `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
        );
        const parseResponse = await response.json();
        this.setState(
          {
            galleryItems: parseResponse.hits,
            status: 'resolved',
            loadMore: page < Math.ceil(parseResponse.totalHits / 12),
          },
          () => {
            console.log('New status:', this.state.galleryItems); // Log the updated status
          }
        );
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  resetPage = () => {
    this.setState({ page: 1 });
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { loadMore, status, galleryItems, searchQuery } = this.state;
    if (status === 'idle' || status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </>
      );
    }
    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return toast.error('Oops, something went wrong! Please, try again!');
    }

    if (status === 'resolved') {
      if (galleryItems.length === 0) {
        return toast.error(
          `Sorry, there are no images matching search query ${searchQuery}. Please try again.`
        );
      }
      if (galleryItems.length > 0) {
        return (
          <>
            <ImageGallery galleryItems={galleryItems} />
            {loadMore && <LoadMoreBtn onClick={this.incrementPage} />}
          </>
        );
      }
    }
  }
}
