import React, { Component } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import classnames from "classnames/bind";

import styles from "./SearchBar.module.scss";

const cx = classnames.bind(styles);

class SearchBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    onSearch: PropTypes.func
  };

  static defaultProps = {
    className: "",
    onSearch: noop
  };

  state = {
    text: ""
  };

  handleInput = event => {
    const text = event.target.value;
    this.setState(_ => ({ text }));
  };

  handleClick = event => {
    event.stopPropagation();
    if (!this.state.text) return;
    this.props.onSearch(this.state.text);
  };

  render() {
    const { text } = this.state;
    const { className } = this.props;
    return (
      <div className={cx(className, "search-bar")}>
        <label>
          <input type="text" value={text} onChange={this.handleInput} />
        </label>
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
