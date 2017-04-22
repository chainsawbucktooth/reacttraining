
var React = require('react');
var ReactDOM = require('react-dom');
var PropTyes = require('prop-types');
require('./index.css');
var App = require('./components/App');

//This is where we invoke the components we created in the components folder
ReactDOM.render(
     <App />,
     document.getElementById('app')
);
