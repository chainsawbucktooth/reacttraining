var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function MoviePreview(props) {
  return (
    <div>
      <div className='column'>
        <img className='avatar'
          src={props.props["Poster"]}
          alt={'Avatar for ' + props.props["Title"]}
          />
          <h2 className='username'>{props.props["Title"]}</h2>
      </div>
       {props.children}
    </div>
  )
}

MoviePreview.propTypes = {
  props: PropTypes.object.isRequired
}

module.exports = MoviePreview;
