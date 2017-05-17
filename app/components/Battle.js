var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var MoviePreview = require('./MoviePreview');
var PlayerInput = require('./PlayerInput');
var axios = require('axios');

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieOne: null,
      movieTwo: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(id, title) {
      var self = this;
      var newState = {};
      var encodedURI = window.encodeURI('https://www.omdbapi.com/?t=' + title + '&type=movie');
      return axios.get(encodedURI)
        .then(function (response) {
            newState[id] = response.data;
            self.setState(newState);
        });
  }

  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id] = null;
      return newState;
    })
  }

  render() {
    var match = this.props.match;
    var movieOne = this.state.movieOne;
    var movieTwo = this.state.movieTwo;

    return (
      <div>
        <div className='row'>
          {!movieOne &&
            <PlayerInput
              id='movieOne'
              label='Movie One'
              onSubmit={this.handleSubmit}
            />}

          {movieOne !== null &&
            <MoviePreview
              props={movieOne}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(this, 'movieOne')}>
                    Reset
                </button>
            </MoviePreview>}

          {!movieTwo &&
            <PlayerInput
              id='movieTwo'
              label='Movie Two'
              onSubmit={this.handleSubmit}
            />}

          {movieTwo !== null &&
            <MoviePreview
              props={movieTwo}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(this, 'movieTwo')}>
                    Reset
                </button>
            </MoviePreview>}
        </div>

        {movieOne && movieTwo &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?movieOneName=' + movieOne["Title"] + '&movieTwoName=' + movieTwo["Title"]
            }}>
              Battle
          </Link>}
      </div>
    )
  }
}

module.exports = Battle;
