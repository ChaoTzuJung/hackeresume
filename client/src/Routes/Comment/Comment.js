import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../../components/PostItem';
import Spinner from '../../components/Spinner';
import { getPost } from '../../actions/post';

class Comment extends Component {
    componentDidMount() {
        // 重要： 用網址取得相對post
        this.props.getPost(this.props.match.params.id);
    }

    render() {
        const { post, loading } = this.props.post;
        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner />;
        } else {
            postContent = (
                <div>
                    {/* 不希望like button 顯示在 post item 用 showActions 管理 */}
                    <PostItem post={post} showActions={false} />
                </div>
            );
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Back To Feed
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired // single post
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Comment);
