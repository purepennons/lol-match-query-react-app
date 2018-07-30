import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import classnames from "classnames/bind";

import NotFound from "../pages/error/NotFound";
import Index from "../pages/Index";

import history from "../shared/history";
import styles from "./Application.module.scss";

const cx = classnames.bind(styles);

const enhance = compose(
  connect(
    ({ shared }) => ({
      isInitializing: shared.isInitializing
    }),
    null
  )
);

class Application extends Component {
  render() {
    const { isInitializing } = this.props;
    return (
      <Router history={history}>
        <div className={cx("app-container")}>
          {isInitializing ? (
            <p className={cx("initial")}>App is initializing...</p>
          ) : (
            <Switch>
              <Route path="/" name="Index" component={Index} />
              <Route path="*" name="NotFound" component={NotFound} />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

Application.propTypes = {};

Application.defaultProps = {};

export default enhance(Application);
