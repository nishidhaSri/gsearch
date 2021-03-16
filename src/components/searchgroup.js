import React from "react";
import { Badge, Card, Result, message } from "antd";
import { HeartOutlined, LoadingOutlined } from "@ant-design/icons";

class SearchGroup extends React.Component {
  state = {
    userFav: [],
  };
  componentDidMount() {
    let arr = [];
    localStorage.getItem("fav")
      ? (arr = JSON.parse(localStorage.getItem("fav")))
      : (arr = []);
    this.setState({ userFav: arr });
  }
  handleFaveClick = (val) => {
    let arr = [...this.state.userFav];
    const index = arr.indexOf(val.url);
    let notif = "";
    if (index > -1) {
      arr.splice(index, 1);
      notif = "User removed from favorites successfully";
      message.error(notif);
    } else {
      arr.push(val.url);
      notif = "User added into favorites successfully";
      message.success(notif);
    }

    this.setState({ userFav: arr }, () =>
      localStorage.setItem("fav", JSON.stringify(this.state.userFav))
    );
    this.forceUpdate();
  };
  render() {
    const { Meta } = Card;
    const { result, hit, loading } = this.props;
    const { userFav } = this.state;

    return (
      <React.Fragment>
        {hit ? (
          !loading ? (
            result.length ? (
              result.map((val, i) => {
                return (
                  <Badge
                    count={
                      <HeartOutlined
                        onClick={() => this.handleFaveClick(val)}
                        style={
                          userFav.includes(val.url)
                            ? {
                                color: "red",
                                background: "#fff",
                                borderRadius: "50%",
                                padding: 4,
                                border: "2px solid red",
                              }
                            : {
                                color: "gray",
                                background: "#fff",
                                borderRadius: "50%",
                                padding: 4,
                                border: "2px solid gray",
                              }
                        }
                      />
                    }
                  >
                    <a href={val.html_url} target="_blank" rel="noreferrer">
                      <Card
                        key={i}
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={val.avatar_url} />}
                      >
                        <Meta
                          title={val.name}
                          description={"Followers: " + val.followers}
                        />
                        <Meta description={"Following: " + val.following} />
                        <Meta description={val.login} />
                      </Card>
                    </a>
                  </Badge>
                );
              })
            ) : (
              <Result status="404" title="" subTitle="" />
            )
          ) : (
            <LoadingOutlined color="#fff" />
          )
        ) : (
          <div style={{ textAlign: "center" }}>
            {/* <Result status="500" title="500" subTitle="Let's start searching!!" /> */}
            <h1 style={{ color: "#fff" }}>
              Explore various github users by searching and
            </h1>
            <h1 style={{ color: "#fff" }}>save your favorite users</h1>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SearchGroup;
