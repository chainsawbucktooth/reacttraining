var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api')
var Loading = require('./Loading');

function SelectLanguage (props) {
  var languages = ['Star Wars', 'Fast and the Furious', 'Star Trek', 'Police Academy', 'Resident Evil', 'Madea'];
  return (
    <ul className='languages'>
      {languages.map(function (lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, lang)}
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
  onSelect: PropTypes.func.isRequired,
};

function ReposGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo["imdbID"]} className='popular-item'>
             <div className='popular-rank'>#{index + 1}</div>
             <ul className='space-list-items'>
               <li>
                  <img
                    className='avatar'
                    src={repo["Poster"]}
                    alt={'Avatar for ' + repo["Title"]}
                  />
               </li>
               <li><a href={repo["Poster"]}>{repo["Title"]}</a></li>
               <li>{repo["Year"]}</li>
             </ul>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.proptypes = {
  repos: PropTypes.array.isRequired,
}

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(function(repos) {
        this.setState(function(){
           return {
             repos: repos
           }
        })
      }.bind(this));

  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
        {!this.state.repos
          ? <Loading text='Downloading' speed={100}/>
          : <ReposGrid repos={this.state.repos}/>
        }
      </div>
    )
  }
}

module.exports = Popular;
