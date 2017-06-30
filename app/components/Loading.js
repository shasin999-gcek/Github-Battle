import React from "react";
import PropType from "prop-types";

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }

  componentDidMount() {
    const stopper = this.props.text + "...";

    this.interval = window.setInterval(function () {
      if(this.state.text === stopper) {
        this.setState(function() {
          return {
            text: this.props.text
          }
        });
      } else {
        this.setState(function(prevState) {
          return {
            text: prevState.text + "."
          }
        });
      }
    }.bind(this), this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    );
  }
}

Loading.defaultProps = {
  text: "Loading",
  speed: 300
}

Loading.propTypes = {
  text: PropType.string.isRequired,
  speed: PropType.number.isRequired
}

export default Loading;
