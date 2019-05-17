import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import Spinner from '../../components/Spinner';

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }
    render() {
        const { loading, profiles } = this.props.profile;

        let profileItems;
        if (profiles === null || loading) {
            profileItems = <Spinner />;
        } else {
            if(profiles.length > 0) {
                profileItems = <h1>Profile Here</h1>;
            } else {
                profileItems = <h4>No Profiles found...</h4>;
            }
        }

        return(
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">
                                Browser and connect with developer
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles);

