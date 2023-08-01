import { Component } from 'react';
import { toast } from 'react-toastify';
import { BiSearchAlt2 } from 'react-icons/bi';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.min.css';

class Searchbar extends Component {
  state = { searchQuery: '' };

  handleSearchQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.warn('Please, enter search query!');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <BiSearchAlt2 />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchQuery}
            placeholder="Search images and photos"
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
