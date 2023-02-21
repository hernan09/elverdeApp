import './App.css';
import Home from './Components/Home/main.jsx';
//import Footer from './Components/Footer/footer.jsx';
// import Particles from "react-tsparticles";
// import particlesConfig from './config/particles';
// import { useCallback } from "react";
// import { loadFull } from "tsparticles";



function App() {
//   const particlesInit = useCallback(async engine => {
//     await loadFull(engine);
// }, []);

// const particlesLoaded = useCallback(async container => {
//     await console.log(container);
// }, []);
  
  
  return (
    <div className="App">
     {/* <Particles options={particlesConfig} init={particlesInit} loaded={particlesLoaded}></Particles> */}
     <Home></Home>
     {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
