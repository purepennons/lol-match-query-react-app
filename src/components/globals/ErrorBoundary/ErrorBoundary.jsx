import { Component } from "react";
import PropTypes from "prop-types";
import { isFunction } from "lodash";

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    this.props.onError({
      error,
      errorInfo,
      clearError: this.clearError
    });
    this.setState({
      error,
      errorInfo
    });
  }

  clearError = () => {
    this.setState({
      error: null,
      errorInfo: null
    });
  };

  render() {
    const { renderError } = this.props;
    const { error, errorInfo } = this.state;
    if (error) {
      return isFunction(renderError)
        ? renderError({
            error,
            errorInfo,
            clearError: this.clearError
          })
        : renderError;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  onError: PropTypes.func,
  renderError: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

ErrorBoundary.defaultProps = {
  onError: console.error,
  renderError: null
};

export default ErrorBoundary;
