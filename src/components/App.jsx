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
    status: null,
  };

  fetchImages = async () => {
    const { page, searchQuery } = this.state;
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    const parseResponse = await response.json();
    return parseResponse;
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    const differentSearchQuery = prevState.searchQuery !== searchQuery;
    const differentPage = prevState.page !== page;
    if (differentSearchQuery || differentPage) {
      this.setState({ status: 'pending' });
      try {
        const fetchResult = await this.fetchImages();
        this.setState({
          galleryItems: [...prevState.galleryItems, ...fetchResult.hits],
          status: null,
          loadMore: page < Math.ceil(fetchResult.totalHits / 12),
        });
        if (fetchResult.hits.length === 0) {
          return toast.error(
            `Sorry, there are no images matching search query ${searchQuery}. Please try again.`
          );
        }
      } catch (error) {
        toast.error('Oops, something went wrong! Please, try again!');
      }
    }
  }

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, galleryItems: [], page: 1 });
  };

  render() {
    const { loadMore, status, galleryItems } = this.state;
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
        {status === 'pending' && <Loader />}
        {galleryItems.length > 0 && (
          <ImageGallery galleryItems={galleryItems} />
        )}
        {loadMore && <LoadMoreBtn onClick={this.incrementPage} />}
      </>
    );
  }
}
