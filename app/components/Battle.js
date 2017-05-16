var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');
var PlayerInput = require('./PlayerInput');
var ReposGrid = require('./ReposGrid');
var axios = require('axios');

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieOneName: '',
      movieTwoName: '',
      movieOneImage: null,
      movieTwoImage: null,
      movieArrayOne: null,
      movieArrayTwo: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(id, title) {
      var self = this;
      var newState = {};
      var encodedURI = window.encodeURI('https://www.omdbapi.com/?s=' + title + '&type=movie');
      return axios.get(encodedURI)
        .then(function (response) {
            newState[id + 'Name'] = title;
            newState[id + 'Image'] = response.data["Poster"];
            self.setState(newState)
        });
  }

  handleSubmit(id, title) {
      var self = this;
      var newState = {};
      var encodedURI = window.encodeURI('https://www.omdbapi.com/?t=' + title + '&type=movie');
      return axios.get(encodedURI)
        .then(function (response) {
            newState[id + 'Name'] = title;
            newState[id + 'Image'] = response.data["Poster"];
            self.setState(newState)
        });
  }

  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    })
  }

  render() {
    var match = this.props.match;
    var movieOneName = this.state.movieOneName;
    var movieOneImage = this.state.movieOneImage;
    var movieTwoName = this.state.movieTwoName;
    var movieTwoImage = this.state.movieTwoImage;
    var movieArrayOne = this.state.movieArrayOne;
    var movieArrayTwo = this.state.movieArrayTwo;

    return (
      <div>
        <div className='row'>
          {!movieOneName &&
            <PlayerInput
              id='movieOne'
              label='Movie One'
              onSubmit={this.handleSubmit}
            />}

          {movieOneImage !== null &&
            <PlayerPreview
              avatar={movieOneImage}
              username={movieOneName}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(this, 'movieOne')}>
                    Reset
                </button>
            </PlayerPreview>}

          {!movieTwoName &&
            <PlayerInput
              id='movieTwo'
              label='Movie Two'
              onSubmit={this.handleSubmit}
            />}

          {movieTwoImage !== null &&
            <PlayerPreview
              avatar={movieTwoImage}
              username={movieTwoName}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(this, 'movieTwo')}>
                    Reset
                </button>
            </PlayerPreview>}
        </div>

        {movieOneImage && movieTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?movieOneName=' + movieOneName + '&movieTwoName=' + movieTwoName
            }}>
              Battle
          </Link>}
      </div>
    )
  }
}

module.exports = Battle;
