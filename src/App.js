import React from 'react';
import dotenv from 'dotenv';
import { Drizzle } from 'drizzle';
import { DrizzleContext } from "drizzle-react";

import DApp from "./components/DApp";
import SimpleAppBar from "./components/SimpleAppBar";
import drizzleOptions from "./drizzleOptions";
import store from './middleware';

dotenv.config();
const drizzle = new Drizzle(drizzleOptions, store);

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}

function App() {
  return (
    <div className="App">
      <SimpleAppBar />
      <header className="App-header">
        <DrizzleContext.Provider drizzle={drizzle}>
          <DApp />
        </DrizzleContext.Provider>
      </header>
    </div>
  );
}

export default App;
