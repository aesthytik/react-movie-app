import React from 'react';
import YouTube from 'react-youtube';
import { API_URL } from '../../config';

import MovieInfo from '../elements/MovieInfo/MovieInfo';

class Movie extends React.Component {
  state = {
    movie: null,
    loading: false,
    trailer: '',
  };

  componentDidMount = () => {
    const { movieId } = this.props.match.params;
    const newMovieId = String(movieId);
    this.setState({ loading: true });
    const endpoint = `${API_URL}/movie/${newMovieId}`;
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(
        result =>
          this.setState({
            movie: result,
            loading: false,
            trailer: result.trailer,
          })
        // console.log(result)
      );
  };

  render() {
    const { movie, trailer } = this.state;
    let youtube_id = '';
    if (trailer.match('http://(www.)?youtube|youtu.be')) {
      youtube_id = trailer.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
    }
    const opts = {
      height: '800px',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <div>
        {movie && <MovieInfo movie={movie} />}
        <YouTube videoId={youtube_id} opts={opts} />
      </div>
    );
  }
}

export default Movie;
