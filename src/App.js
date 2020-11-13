import React from 'react';
import Navbar from "./components/Navbar";
import Titles from "./components/Title";
import Search from "./components/Search";
import Footer from "./components/Footer";


function App() {
  return(
      <div className="flexbox-container">
        <Navbar />
        <Titles/>
        <Search/>
        <Footer/>
      </div>



  )
}

export default App;