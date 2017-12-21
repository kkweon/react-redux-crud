import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPost, deletePost } from "../actions";
import { Link } from "react-router-dom";

const propTypes = {};

const defaultProps = {};

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { post } = this.props;
    if (!post) return <div>Loading...</div>;
    return (
      <div style={{ paddingTop: "3%" }}>
        <div className="d-flex justify-content-between">
          <Link to="/" className="btn btn-primary">
            Back to Index
          </Link>

          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete
          </button>
        </div>

        <div className="post-detail" style={{ marginTop: "2%" }}>
          <p>#{post.id}</p>
          <h4 className="display-4">{post.title}</h4>

          <p className="text-muted">Categories: {post.categories}</p>
          <p>{post.content}</p>
        </div>
      </div>
    );
  }
}

PostShow.propTypes = propTypes;
PostShow.defaultProps = defaultProps;

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
