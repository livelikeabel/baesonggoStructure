import React, { Component } from 'react';
import { getDelivery } from 'src/api/vroong';

class App extends Component {
  componentDidMount(){
    getDelivery(18031458095084);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">배송현황판</h1>
        </header>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}

export default App;
