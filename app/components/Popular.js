import React from "react";
import PropType from "prop-types";

// import api object
import api from "../utils/api";

import Loading from "./Loading";

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage : 'All',
			repos: null
		};
		// explicit binding
		this.updateLanguage = this.updateLanguage.bind(this);
	}

  updateLanguage(lang) {
		// updating new selectedLanguage state
  	this.setState(function() {
			return {
				selectedLanguage: lang,
				repos: null
			}
		});

		// fetch popular repository from github and update the states
		api.fetchPopularRepos(lang)
			 .then(function(repos) {
				 this.setState(function() {
					 return {
						 repos: repos
					 }
				 });
			 }.bind(this));
  }

  componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	render() {
		return (
			<div>
				<SelectedLanguages
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage} />
					{!this.state.repos
						? <Loading />
						: <RepoGrid repos={this.state.repos} />
					}
			</div>
		);
	}
}

let SelectedLanguages = (props) => {
	let languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

	return (
		<div>
			<ul className="languages">
				{languages.map(function(lang) {
					return (
						<li style={props.selectedLanguage === lang ? {color: '#F44336'} : null}
						      key={lang} onClick={props.onSelect.bind(null, lang)}>
							{ lang }
						</li>
					);
				}, this)}
			</ul>
		</div>
	);
}

SelectedLanguages.propTypes = {
	selectedLanguage: PropType.string.isRequired,
	onSelect: PropType.func.isRequired
}

let RepoGrid = (props) => {
	return (
		<ul className="popular-list">
			{props.repos.map(function(repo, index) {
				return (
					<li key={repo.name} className="popular-item">
						<div className="popular-rank">{ index + 1 } </div>
						<ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
					</li>
				)
			})}
		</ul>
	)
}

RepoGrid.propType = {
	repos: PropType.array.isRequired,
}

export default Popular;
