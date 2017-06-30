import React from "react";
import { Link } from "react-router-dom";

import Footer from "./Footer";

const Home = (props) => {
  return (
    <div className="home-container">
      <h1> Github Battles And Other Stuffs .... </h1>
      <Link className="button" to="/battle">
        Battle
      </Link>
      <Footer>
        Designed by Muhammed Shasin.
      </Footer>
    </div>
  )
}

export default Home;
