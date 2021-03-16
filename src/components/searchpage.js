import axios from "axios";
import React from "react";
import "../css/searchpage.css";
import SearchGroup from "./searchgroup";
import { ArrowRightOutlined } from "@ant-design/icons";
import { AT } from "../config";

class SearchPage extends React.Component {
  state = {
    searchtext: "",
    result: [],
    hit: false,
    loading: false,
  };
  handleChange = async (e) => {
    this.setState({ loading: true });
    this.setState({ searchtext: e.target.value }, async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/search/users?q=${this.state.searchtext}`,
          {
            headers: {
              Authorization: `token ${AT}`,
            },
          }
        );
        let arr = [];
        const { items } = res.data;
        items.forEach((e) => {
          axios
            .get(`${e.url}`, {
              headers: {
                Authorization: `token ${AT}`,
              },
            })
            .then((resp) => arr.push(resp.data))
            .catch((err) => console.log(err));
        });
        this.setState({ result: arr, loading: false, hit: true });
      } catch (error) {
        // console.log(error);
        this.setState({ result: [], loading: false, hit: true });
      }
      // console.table(this.state.loading, this.state.hit, this.state.result);
    });
  };
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
        <div className="searchbar">
          <input
            type="text"
            name="search"
            value={this.state.searchtext}
            onChange={this.handleChange}
            placeholder="Start searching..."
          />
        </div>
        <div className="searchresults">
          <SearchGroup
            result={this.state.result}
            hit={this.state.hit}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;
