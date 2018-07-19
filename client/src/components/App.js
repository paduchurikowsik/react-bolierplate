// import React, { Component } from 'react';
import React from 'react';

import './App.css';

// import { Query } from 'react-apollo';
// import { GET_ABOUT } from '../queries';
import About from './About/About';

const App = () => (
  <div className="App">
    {/* <h1>HOME</h1>
    <Query query={GET_ABOUT}>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>Loading ...</div>
        }
        if (error) {
          return <div>Error</div>
        }
        // console.log(data);
        return (
         <About data={adata}/>
        )
      }}
    </Query> */}
    <About />
  </div>
)

export default App;
