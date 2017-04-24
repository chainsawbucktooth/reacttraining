var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage(props)  {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(function(lang){
          return (
            <li
              style= {lang === props.selectedLanguage ? { color: '#d0021b'}: null }
              onClick = {props.updateLanguage.bind(null, lang)}
              key={lang}>
              {lang}
            </li>
          )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.string.isRequired,
}


class Popular extends React.Component {

  //this constructor is how we create STATE, which we use to keep track of which language is currently selected
  constructor(props) {
     super();
     this.state = {
        selectedLanguage: 'All',
     };

    //bind to set the context of the function, can also use it to pass argument
    //bind property takes in a context and returns a new function with this bound to whatever you pass it
    //updateLanugage will always be called with the correct context
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  //this is the function that will update STATE
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
      }
    });
  }

  render() {
    return (
      <div>
        <SelectLanguage
         selectedLanguage = {this.state.selectedLanguage}
         onSelect = {this.updateLanguage} />
      </div>
    )
  }
}

module.exports = Popular;
