var React = require('react');


class Popular extends React.Component {

  //this constructor is how we create STATE, which we use to keep track of which language is currently selected
  constructor (props) {
     super(props);
     this.state = {
        selectedLanguage: 'All'
     };

    //bind to set the context of the function, can also use it to pass argument
    //bind property takes in a context and returns a new function with this bound to whatever you pass it
    //updateLanugage will always be called with the correct context
    this.updateLanguage = this.updateLanguage.bind(this)

  }

  //this is the function that will update STATE
  updateLanguage(lang) {
    this.setState(function(){
      return {
        selectedLanguage: lang
      }
    })
  }



  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      <ul className='languages'>
        {languages.map(function(lang){
            return (
              <li
                style= {lang === this.state.selectedLanguage ? { color: '#d0021b'}: null }
                onClick = {this.updateLanguage.bind(null, lang)}
                key={lang}>
                {lang}
              </li>
            )
        }, this)}
      </ul>
    )
  }
}

module.exports = Popular;
