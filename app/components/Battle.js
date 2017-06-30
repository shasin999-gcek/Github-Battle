import React from "react";
import PropType from "prop-types";

import { Link } from "react-router-dom";

import PlayerPreview from "./PlayerPreview";


// To input username and updates state of Battle Component
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;

    this.setState(function() {
      return {
        username: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter Username"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropType.string.isRequired,
  label: PropType.string.isRequired,
  onSubmit: PropType.func.isRequired
}

// main parent Component
class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function() {
      let newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] = 'https://github.com/' + username + '.png?size=200';

      return newState;
    });
  }

  handleReset(id) {
    this.setState(function() {
      let resetState = {};
      resetState[id + "Name"] = "";
      resetState[id + "Image"] = null;

      return resetState;
    })
  }

  render() {
    const {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage
    } = this.state;

    const { match } = this.props;

    return (
      <div>
        <div className="row">

          {!playerOneName ?
            (
              <PlayerInput
                id = "playerOne"
                label = "Player One"
                onSubmit={this.handleSubmit}
              />
            ) : (
              <PlayerPreview
                avatar={playerOneImage}
                username={playerOneName}>
                  <button
                    className="reset"
                    onClick={this.handleReset.bind(null, "playerOne")}>
                  Reset
                  </button>
              </PlayerPreview>
            )
          }

          {!playerTwoName ?
            (
              <PlayerInput
                id = "playerTwo"
                label = "Player Two"
                onSubmit={this.handleSubmit}
              />
            ) : (
              <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}>
                  <button
                    className="reset"
                    onClick={this.handleReset.bind(null, "playerTwo")}>
                        Reset
                  </button>
              </PlayerPreview>
            )
          }

        </div>

          {playerOneImage && playerTwoImage &&
            <Link
              className="button"
              to={{
                pathname: match.url + '/results',
                search: '?playerOneName=' + playerOneName
                  + '&playerTwoName=' + playerTwoName
              }}>
              Battle
            </Link>
          }
      </div>
    )
  }
}


export default Battle;
