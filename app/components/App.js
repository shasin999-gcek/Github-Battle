import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing core components
import Battle from "./Battle";
import Home from "./Home";
import Nav from "./Nav";
import Popular from "./Popular";
import Results from "./Results";


class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Nav />
          <Switch>
  					<Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
  					<Route path="/popular" component={Popular} />
            <Route render={() => <p>Not Found ! </p>} />
          </Switch>
				</div>
			</Router>
		);
	}
}

export default App;