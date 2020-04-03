import React, { Component } from 'react';

function logProps(WrappedComponent) {
  class LogProps extends Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const { ref1, ...rest } = this.props;
      return <WrappedComponent ref={ref1} {...rest} />;
    }
  }
  // LogProps.displayName = 'aaa';
  return React.forwardRef((props, ref) => <LogProps {...props} ref1={ref} />);
}

class FancyButtonInner extends React.Component {
  render() {
    return <button className="FancyButton">{this.props.children}</button>;
  }
}

const FancyButton = logProps(FancyButtonInner);

export default FancyButton;
