import './App.css';
import Home from './Components/Home/main.jsx';

import ReactGA from 'react-ga';

ReactGA.initialize('G-Y358VKXYPF');

const chartPath1 = 'M0,120 C40,100 80,140 120,110 S180,130 240,90 S300,120 360,80 S420,110 480,70 S540,100 600,60 S660,90 720,50 S780,80 840,40 S900,70 960,30';
const chartPath2 = 'M0,160 C60,140 120,170 180,130 S240,160 300,120 S360,150 420,110 S480,140 540,100 S600,130 660,90 S720,120 780,80 S840,110 900,70 S960,100 1020,60';
const chartPath3 = 'M0,90 C30,80 60,100 90,75 S120,95 150,60 S180,85 210,50 S240,75 270,40 S300,65 330,30 S360,55 390,25 S420,50 450,20';

function App() {
  return (
    <div className="App">
      <div className="bg-chart-line" aria-hidden="true">
        <svg viewBox="0 0 800 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d={chartPath1} fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d={chartPath2} fill="none" stroke="#95d5b2" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <svg viewBox="0 0 500 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d={chartPath3} fill="none" stroke="#2d6a4f" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </div>
      <Home />
    </div>
  );
}

export default App;
