import React from "react";
import img from "../img/anime.png";
import "../css/anime.css";

class Anime extends React.Component {
  render() {
    return (
      <div className="anime-block">
        <img className="rocket" src={img} alt="boooosstttt" />
      </div>
    );
  }
}

export default Anime;
