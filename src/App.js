import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    }
  }

  /*
  // setState example with state and props in anonymous function
  handleClick = () => {
    this.setState((state, props) => {
      console.log(state, props);
      return { meaningOfLife: state.meaningOfLife + props.increment }
    }, () => console.log(this.state.meaningOfLife));

  }
  */

  render() {
    return (
      <div>
        <HomePage></HomePage>
      </div>
    );
  }
}

export default App;
