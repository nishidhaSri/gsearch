import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import axios from "axios";
import SearchGroup from "../components/searchgroup";
import { AT } from "../config";

class Dashboard extends React.Component {
  state = {
    result: [],
  };
  componentDidMount() {
    const fav = JSON.parse(localStorage.getItem("fav"));
    let arr = [];
    fav.forEach((e) => {
      axios
        .get(`${e}`, {
          headers: {
            Authorization: `token ${AT}`,
          },
        })
        .then((resp) => {
          arr.push(resp.data);
          this.setState((prev) => ({
            result: [...prev.result, resp.data],
          }));
          // console.log(arr);
        })
        .catch((err) => console.log(err));
    });
  }
  render() {
    return (
      <div className="searchpage">
        <div className="concept concept-six">
          <a className="dashboard-link" href="/me">
            <div className="dash-link">
              Saved Profiles <ArrowRightOutlined />
            </div>
          </a>
          <a href="/" style={{ width: "100%", height: "100%" }}>
            <h1 className="title">
              {["G", "S", "E", "A", "R", "C", "H"].map((val, i) => (
                <span key={i} className="char">
                  {val}
                </span>
              ))}
            </h1>
          </a>
        </div>
        {/* <div className="searchbar">
          <input
            type="text"
            name="search"
            value={this.state.searchtext}
            onChange={this.handleChange}
            placeholder="Start searching..."
          />
        </div> */}
        <div className="searchresults">
          <SearchGroup hit={true} result={this.state.result} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
