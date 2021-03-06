import React from 'react';
import { API_URL } from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import Spinner from '../elements/Spinner/Spinner';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';

class Home extends React.Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 1,
    totalPages: 0,
    searchTerm: '',
  };

  componentDidMount = () => {
    if (localStorage.getItem('all-movies')) {
      const state = JSON.parse(localStorage.getItem('all-movies'));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const endpoint = `${API_URL}/movies/1`;
      this.fetchItems(endpoint);
    }
  };

  loadMoreItems = () => {
    // ES6 Destructuring the state
    const { searchTerm, currentPage } = this.state;

    let endpoint = '';
    this.setState({ loading: true });

    endpoint = `${API_URL}/movies/${currentPage + 1}`;

    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    const { movies, heroImage } = this.state;
    fetch(endpoint)
      .then(result => result.json())
      .then(
        result =>
          this.setState(
            {
              movies: [...movies, ...result],
              heroImage: result[0],
              loading: false,
            },
            () => {
              localStorage.setItem('all-movies', JSON.stringify(this.state));
            }
          )
        // console.log(result)
      );
  };

  render() {
    const { movies, heroImage, loading } = this.state;
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
        <div className="rmdb-home-grid">
          <FourColGrid
          // header={searchTerm ? 'Search Result' : 'Popular Movies'}
          // loading={loading}
          >
            {movies.map((element, i) => (
              <MovieThumb
                key={i}
                clickable={true}
                image={
                  element.images
                    ? element.images.banner
                    : './images/no_image.jpg'
                }
                movieId={element.imdb_id}
                movieName={element.title}
              />
            ))}
          </FourColGrid>
          {loading ? <Spinner /> : null}

          <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
        </div>
      </div>
    );
  }
}

export default Home;
