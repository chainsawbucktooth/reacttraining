
var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');


  //state
  //life cycle event - add to or remove from screen

//This is the definition of the React component
class App extends React.Component {

 render() {
   //render method is how you set the UI aspect of the React Component
    return (
      //this part below is converted into jsx - Javascript - by Webpacks
      <div>
          Hello world!
      </div>
    )
  }
}
//This is where we invoke the component we created above
ReactDOM.render(
     <App />,
     document.getElementById('app')
);
