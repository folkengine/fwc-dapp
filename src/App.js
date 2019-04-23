import React from 'react';
import dotenv from 'dotenv';

import SimpleAppBar from "./components/SimpleAppBar";

dotenv.config();

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}

function App() {
  return (
    <div className="App">
      <SimpleAppBar />
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
