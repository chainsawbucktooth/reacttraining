var React = require('react');
var PropTypes = require('prop-types');

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


module.exports = ReposGrid;
