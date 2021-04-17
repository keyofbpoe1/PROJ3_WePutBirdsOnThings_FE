
import logo from './logo.svg';
import './App.css';
import BirdsHeader from './components/BirdsHeader.js'
import BirdsNav from './components/BirdsNav.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




function App() {
  return (
    <div className="App">
    <Router>
      <BirdsNav/>
    </Router>
      <BirdsHeader name={'Max, Kaushik, and Stephen'}/>
    </div>
  );
}

export default App;
