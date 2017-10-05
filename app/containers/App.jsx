// @flow

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { func } from "prop-types";

import axios from "axios";

import Catalog from "./Catalog";

const RouteNotFound = () => <h1>404</h1>;

class App extends Component {
  // static propTypes = {
  //   handleCloseModal: func.isRequired
  // };

  state = {
    posts: [],
    loading: true,
    error: {}
  };

  componentDidMount() {
    const apiServer = `${gdr_catalog_object.gdr_api_url}/opportunities`;

    axios
      .get(apiServer)
      .then((response: { data: { data: [] } }) => {
        const posts = response.data.data.map(post => post);

        this.setState({
          posts,
          loading: false,
          error: {}
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err
        });
      });
  }

  renderError() {
    return (
      <div>
        Something went wrong: {this.state.error.message}
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter basename={gdr_catalog_object.gdr_app_root_url}>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              component={props =>
                <Catalog
                  posts={this.state.posts}
                  loading={this.state.loading}
                  {...props}
                />}
            />
            <Route component={RouteNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
