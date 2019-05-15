import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteEducation } from '../../actions/profile';

class Education extends Component {
    onDeleteClick(id) {
        this.props.deleteEducation(id)
    }
    render() {
        const educationTable = this.props.educations.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {' '}
                    {edu.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
                </td>
                {/* 重要：pass experience id */}
                <td><button onClick={this.onDeleteClick.bind(this, edu._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ));
        return (
            <div >
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th />
                        </tr>
                        {educationTable}
                    </thead>
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    experiences: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(Education);