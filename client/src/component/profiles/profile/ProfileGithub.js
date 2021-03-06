import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get_github_repos } from '../../../redux/profile/action'
const ProfileGithub = ({get_github_repos, username, repos}) => {
    useEffect(() => {
        get_github_repos(username)
    }, [get_github_repos,username])

    const repo =repos&& repos.map(repo=>(
        <div className="repo bg-white p-1 my-1" key={repo.id}>
        <div>
          <h4><a href={repo.html_url} target="_blank"
              rel="noopener noreferrer">{repo.name}</a></h4>
          <p>{repo.description}</p>
        </div>
        <div>
          <ul>
            <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
            <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
            <li className="badge badge-light">Forks: {repo.forks_count}</li>
          </ul>
        </div>
      </div>
    ))
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
            </h2>
            {repo}
        </div>
    )
}

ProfileGithub.propTypes = {
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    get_github_repos:PropTypes.func.isRequired
}
const mapStateToprops = state => ({ repos: state.profile.repos })

export default connect(mapStateToprops, { get_github_repos })(ProfileGithub)
