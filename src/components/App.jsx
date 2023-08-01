import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  render() {
    return (
      <div>
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
        <ImageGallery
          searchQuery={this.state.searchQuery}
          page={this.state.page}
          incrementPage={this.incrementPage}
        />
      </div>
    );
  }
}
