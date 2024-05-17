// App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeRoutes from './routes/Router';

function App() {
  return (
    <Router>
        <ThemeRoutes />
    </Router>
  );
}

export default App;
