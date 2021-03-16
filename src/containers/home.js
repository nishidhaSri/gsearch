import React from "react";
import Anime from "../components/anime";
import SearchPage from "../components/searchpage";

class Home extends React.Component {
  state = {
    initial: true,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ initial: false });
    }, 3500);
  }
  render() {
    const { initial } = this.state;
    return <div>{initial ? <Anime /> : <SearchPage />}</div>;
  }
}

export default Home;
