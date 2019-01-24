import React from 'react';
import { API_URL, API_KEY } from '../../config';

class Home extends React.Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    const { movies, heroImage } = this.state;
    fetch(endpoint)
      .then(result => result.json())
      .then(
        result =>
          this.setState({
            movies: [...movies, ...result.results],
            heroImage: heroImage || result.results[0],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages,
          })
        // console.log(result)
      );
  };

  render() {
    return <div>Home</div>;
  }
}

export default Home;
