import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        // 重要: 
        this.state = {
            // 註冊認證 github clientId & clientSecret : https://github.com/settings/applications/new
            clientId: '26c196bacea7db10cf48',
            clientSecret: '0885cb690e07d2a93a6afb0891fb552fd9f7aa53',
            count: 5, // 抓5筆 repo
            sort: 'created: asc', // repo 排列方式用 創建repo的時間
            repos: []
        };
    }

    componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    // 重要: call github api by fetch
    fetch(
        `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
        .then(res => res.json())
        .then(data => {
            // 重要: Why set ref to ProfileGithub component?
            // Because meet error: Can't call setstate (or forceupdate) on an unmounted component
            if (this.refs.myRef) {
            this.setState({ repos: data });
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        const { repos } = this.state;

        const repoItems = repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
            <div className="row">
            <div className="col-md-6">
                <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                    {repo.name}
                </Link>
                </h4>
                <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
                <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
                </span>
                <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
                </span>
                <span className="badge badge-success">
                Forks: {repo.forks_count}
                </span>
            </div>
            </div>
        </div>
        ));
        return (
        // 重要: Why set ref to ProfileGithub component?
        // Because meet error: Can't call setstate (or forceupdate) on an unmounted component
        <div ref="myRef">
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            {repoItems}
        </div>
        );
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
};

export default ProfileGithub;
