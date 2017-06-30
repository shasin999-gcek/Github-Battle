import  React from "react";
import PropType from "prop-types";


// PlayerPreview Component to preview Player Details
const PlayerPreview = (props) => {
  return (
    <div>
      <div className="column">
        <img
          className="avatar"
          src={props.avatar}
          alt={props.username}
        />
        <h2 className="username">@{props.username}</h2>
      </div>
      { props.children }
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropType.string.isRequired,
  username: PropType.string.isRequired,
}


export default PlayerPreview;
