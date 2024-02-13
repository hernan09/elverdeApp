import './App.css';
import Home from './Components/Home/main.jsx';

import ReactGA from 'react-ga';

ReactGA.initialize('G-Y358VKXYPF');


function App() {
  return (
    <div className="App">
     <Home></Home>
    </div>
  );
}

export default App;
