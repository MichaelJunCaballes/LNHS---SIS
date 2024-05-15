import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesWithAuth from './routes/RoutesWithAuth';

function App() {
  return (
    <Router>
      <RoutesWithAuth />
    </Router>
  );
}

export default App;
