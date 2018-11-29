import React, { Component } from 'react';

const styles = {
  content: {
    textAlign: 'center',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    fontSize: '35px'
  }
};

// update this when errorboundary hook support launches

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    }
  }

  componentDidCatch(error, info) {
    console.warn(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={styles.conctent}>Oh my. Something TERRIBLE has happened.</h1>;
    }

    return this.props.children;
  }
}
