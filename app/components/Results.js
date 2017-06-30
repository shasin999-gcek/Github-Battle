import React from "react";
import { Link } from "react-router-dom";

import queryString from "query-string";

// import api object from utils to use github apis.
import api from "../utils/api";

import PlayerPreview from "./PlayerPreview";
import Loading from "./Loading";

// player component
const Player = (props) => {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

const Profile = (props) => {
  var info = props.info;

  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }

  componentDidMount() {
    const { location } = this.props;

    const players = queryString.parse(location.search);
    const { playerOneName, playerTwoName } =  players;

    api.battle([playerOneName, playerTwoName])
      .then(function(results) {

        // if results are null update error with a message
        if(results === null) {
          this.setState(function() {
            return {
              error: "Something Happened please check usernames are correct.",
              loading: false
            };
          });
        }

        // if results are not null update winner and loser, also set loading to false
        if(results !== null) {
          this.setState(function() {
            return {
              winner: results[0],
              loser: results[1],
              error: null,
              loading: false
            }
          });
        }

      }.bind(this)); // explicit binding( 'this' must be instance of Results)
  }

  render() {
    let { winner, loser, loading, error } = this.state;

    if(loading) {
      return <Loading />;
    }

    if(error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">
            Reset
          </Link>
        </div>
      );
    }

    return (
      <div className="row">
        <Player
          label="Winner"
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label="Loser"
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );

  }
}

export default Results;
