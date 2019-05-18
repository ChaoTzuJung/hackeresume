import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/post';

class PostItem extends Component {

    onDeleteClick(id) {
        this.props.deletePost(id);
    }
    
    onLikeClick(id) {
        this.props.addLike(id);
    }
    
    onUnlikeClick(id) {
        this.props.removeLike(id);
    }
    // 重要: likes 是 array
    findUserLike(likes) {
        const { auth } = this.props;
        // 按讚的人 === 登入的自user 的數量大於0 -> User 已經按過讚(User 是否 in like array)
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const { post, auth, showActions = true } = this.props;
        return (
        <div className="card card-body mb-3">
            <div className="row">
            <div className="col-md-2">
                <a href="profile.html">
                <img
                    className="rounded-circle d-none d-md-block"
                    src={post.avatar}
                    alt=""
                />
                </a>
                <br />
                <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
                <p className="lead">{post.text}</p>
                {showActions ? (
                <span>
                    <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                    >
                    <i
                        // 重要: text-info 代表按讚藍綠色
                        // findUserLike 偵測這們 comment 的 likes
                        className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLike(post.likes)
                        })}
                    />
                    <span className="badge badge-light">{post.likes.length}</span>
                    </button>
                    <button
                    onClick={this.onUnlikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                    >
                    <i className="text-secondary fas fa-thumbs-down" />
                    </button>
                    <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                    </Link>
                    {/* 重要: 判斷留言是否是自己發的，可否刪除 */}
                    {post.user === auth.user.id ? (
                    <button
                        onClick={this.onDeleteClick.bind(this, post._id)}
                        type="button"
                        className="btn btn-danger mr-1"
                    >
                        <i className="fas fa-times" />
                    </button>
                    ) : null}
                </span>
                ) : null}
            </div>
            </div>
        </div>
        );
    }
}

PostItem.defaultProps = {
    showActions: true
};


PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
