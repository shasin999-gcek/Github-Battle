import React from "react";

let styles = {
  color: "#0a93a6",
  textDecoration: "none"
}

const Footer = (props) => {
  return (
    <footer>
      <p>
      <a style={ styles } href="https://github.com/shasin999-gcek/Github-Battle">
        Github Battle
      </a>,
        { " " + props.children}
      </p>
    </footer>
  )
}

export default Footer;
