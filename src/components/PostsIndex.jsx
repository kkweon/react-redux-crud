import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";

const propTypes = {};

const defaultProps = {};

const PostItem = ({ post: { id, title, content, categories } }) => (
  <Link to={`/posts/${id}`}>
    <li className="list-group-item">
      <h5 className="display-5">{title}</h5>
      <p className="lead">{content}</p>
      <p className="text-muted">{categories}</p>
    </li>
  </Link>
);

class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts(posts) {
    return _.map(posts, post => <PostItem key={post.id} post={post} />);
  }

  render() {
    const posts = this.props.posts;
    return (
      <div>
        <div className="d-flex">
          <h4 className="display-4">Posts</h4>

          <Link
            className="ml-auto align-self-center btn btn-primary"
            to="/posts/new"
          >
            Add a post
          </Link>
        </div>

        <ul className="list-group">{this.renderPosts(posts)}</ul>
      </div>
    );
  }
}

PostsIndex.propTypes = propTypes;
PostsIndex.defaultProps = defaultProps;

function mapStateToProps({ posts }) {
  return {
    posts,
  };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
