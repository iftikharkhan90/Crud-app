import React from 'react';

// Router, Switch and Route
import { BrowserRouter as Router } from 'react-router-dom';

// CSS
import 'materialize-css/dist/css/materialize.css'
import './App.css';

// Materialize JS
import 'materialize-css/dist/js/materialize.js'

// Components
import CrudForm from './components/formCrud';


function App() {
  return (
    
        <Router>
                <div className="app">
                    <CrudForm />
                    
                </div>
            </Router>
    
  );
}

export default App;
