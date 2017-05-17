var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var MoviePreview = require('./MoviePreview');
var Loading = require('./Loading');

function Profile (props) {
  var info = props.info;
  return (
    <MoviePreview props={info} >
      <ul className='space-list-items'>
        {info["Year"] && <li><b>Year: </b>{info["Year"]}</li>}
        {info["Actors"] && <li><b>Cast: </b>{info["Actors"]}</li>}
        {info["Plot"] && <li><b>Synopsis: </b>{info["Plot"]}</li>}

      </ul>
    </MoviePreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Movie (props) {
  var link = 'https://www.imdb.com/title/' + props.profile['imdbID'];
  return (
    <div>
      <h1 className='header'><a href={link} >{props.profile["Title"]}</a></h1>
      <h3 style={{textAlign: 'center'}}>{props.rating}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Movie.propTypes = {
  profile: PropTypes.object.isRequired,
}


class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }
  componentDidMount() {
    var movies = queryString.parse(this.props.location.search);
    api.moviebattle([
      movies.movieOneName,
      movies.movieTwoName
    ]).then(function(movies) {
      if (movies === null) {
        return this.setState(function () {
          return {
            error: 'Looks like there was an error. Check that both movies exist.',
            loading: false,
          }
        });
      }

      this.setState(function () {
        return {
          error: null,
          winner: movies[0],
          loser: movies[1],
          loading: false,
        }
      });
    }.bind(this));
  }
  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if (loading === true) {
      return <Loading/>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Movie
          label='Winner'
          rating={winner["imdbRating"]}
          profile={winner}
        />
        <Movie
          label='Loser'
          rating={loser["imdbRating"]}
          profile={loser}
        />
      </div>
    )
  }
}

module.exports = Results;
