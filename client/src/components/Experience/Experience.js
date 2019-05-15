import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profile';

class Experience extends Component {
    render() {
        const experienceTable = this.props.experiences.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}
                    {exp.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                </td>
                <td><button className="btn btn-danger">Delete</button></td>
            </tr>
        ));
        return (
            <div >
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th />
                        </tr>
                        {experienceTable}
                    </thead>
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    experiences: PropTypes.array.isRequired,
}

const enhance = compose(
    withRouter,
    connect(null, null)
)
export default enhance(Experience);