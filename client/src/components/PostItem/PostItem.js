import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostItem extends Component {
    render() {
        return <div>PostItem</div>
    }
}

PostItem.propTypes = {
    posts: PropTypes.array.isRequired
};

export default PostItem;
