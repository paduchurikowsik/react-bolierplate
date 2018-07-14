// import React, { Component } from 'react';
import React from 'react';

import './App.css';

import { Query } from 'react-apollo';
import { GET_ABOUT } from '../queries';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         {/* <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p> */}
//         Home
//       </div>
//     );
//   }
// }

const App = () => (
  <div className="App">
    <h1>HOME</h1>
    <Query query={GET_ABOUT}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading ...</div>
        }
        if (error) {
          return <div>Error</div>
        }
        console.log(data);
        return (
          <p>About</p>
        )
      }}
    </Query>
  </div>
)

export default App;
