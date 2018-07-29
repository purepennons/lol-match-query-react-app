import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import NotFound from "../pages/error/NotFound";
import Index from "../pages/Index";

import history from "../shared/history";
import styles from "./Application.module.scss";

const enhance = compose(
  connect(
    state => ({}),
    {}
  )
);

class Application extends Component {
  render() {
    return (
      <Router history={history}>
        <div className={styles["app-container"]}>
          <Switch>
            <Route path="/" name="Index" component={Index} />
            <Route path="*" name="NotFound" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

Application.propTypes = {};

Application.defaultProps = {};

export default enhance(Application);
