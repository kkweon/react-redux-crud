import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

const propTypes = {};

const defaultProps = {};

const required = value => (value ? undefined : "Required");
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} chracaters or more` : undefined;
const minLength5 = minLength(5);

class PostsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderField({ input, label, textbox, meta: { touched, error } }) {
    let html;
    const className = touched
      ? error ? "form-control is-invalid" : "form-control is-valid"
      : "form-control";
    if (textbox)
      html = (
        <textarea
          {...input}
          className={className}
          placeholder={label}
          required
        />
      );
    else
      html = (
        <input
          {...input}
          type="text"
          className={className}
          placeholder={label}
          required
        />
      );

    return (
      <div className="form-group">
        <label htmlFor="title">{label}</label>
        {html}
        <p className="invalid-feedback">{touched && error}</p>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h4 className="display-4">New Post</h4>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {/* fields */}
          <Field
            label="Title"
            name="title"
            validate={[required, minLength5]}
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            validate={[required, minLength5]}
            component={this.renderField}
          />
          <Field
            label="Content"
            name="content"
            validate={[required, minLength5]}
            textbox="true"
            component={this.renderField}
          />

          <div className="d-flex">
            <button className="btn btn-primary" type="submit">
              Post
            </button>

            <Link className="btn btn-danger ml-3" to="/">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

PostsNew.propTypes = propTypes;
PostsNew.defaultProps = defaultProps;

function validate(values) {
  // values => { title: "asdf", categories: "categories", content: "content" }
  const errors = {};

  if (!values.title) errors.title = "Enter a title";
  if (!values.categories) errors.categories = "Enter some categories";
  if (!values.content) errors.content = "Enter some content";

  // if errors is empty, form is fine
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm",
})(connect(null, { createPost })(PostsNew));
