import React from 'react';
import { API_URL } from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';

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
    const endpoint = `${API_URL}/movies/1`;
    this.fetchItems(endpoint);
  };

  // searchItems = searchTerm => {
  //   let endpoint = '';
  //   this.setState({
  //     movies: [],
  //     loading: true,
  //     searchTerm,
  //   });

  //   if (searchTerm === '') {
  //     endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  //   } else {
  //     endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
  //   }
  //   this.fetchItems(endpoint);
  // };

  // loadMoreItems = () => {
  //   // ES6 Destructuring the state
  //   const { searchTerm, currentPage } = this.state;

  //   let endpoint = '';
  //   this.setState({ loading: true });

  //   if (searchTerm === '') {
  //     endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage +
  //       1}`;
  //   } else {
  //     endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage +
  //       1}`;
  //   }
  //   this.fetchItems(endpoint);
  // };

  fetchItems = endpoint => {
    const { movies, heroImage } = this.state;
    fetch(endpoint)
      .then(result => result.json())
      .then(
        result =>
          this.setState({
            movies: [...movies, ...result],
            heroImage: heroImage || result[0],
            loading: false,
          })
        // console.log(result)
      );
  };

  render() {
    const { heroImage } = this.state;
    console.log(this.state.heroImage);
    return (
      <div className="rmdb-home">
        {heroImage && (
          <React.Fragment>
            <HeroImage
              image={heroImage.images.banner}
              title={heroImage.title}
              text={heroImage.synopsis}
            />
            <SearchBar />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Home;
