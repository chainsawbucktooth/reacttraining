var React = require('react');
var PropTypes = require('prop-types');


class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    //
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    var value = event.target.value;

    this.setState(function() {
      return{
        username: value
      }
    })
  }

  //function for when the button is clicked
  //this function will call the handleSubmit of the Battle Component
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    return (
      <form className = 'column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
        {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}

        />
        <button
        className='button'
        type='submit'
        disabled={!this.state.username}>
         Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}


class Battle extends React.Component {
  //the constructor manages state(?? I think)
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }
    //
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  //function that we will pass to child component that will udpate state
  handleSubmit(id, username) {
    //because we use THIS keyword inside a function, we will need to bind THIS in the constructor above
    //this way, THIS will always refer to the State instance
    this.setState(function() {
       var newState = {};
       newState[id + 'Name'] = username;
       newState[id + 'Image'] = 'https://github.com' + username + '.png?size=200';
       return newState;
    })
  }


  render() {
    //set up variables here
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;


    return (
      <div>
        <div className='row'>
          {!playerOneName &&
           <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
           />}

           {!playerTwoName &&
            <PlayerInput
             id='playerTwo'
             label='Player Two'
             onSubmit={this.handleSubmit}
            />}
        </div>
      </div>
    )
  }
}


module.exports = Battle;
