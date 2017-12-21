/**
 * @fileOverview Action Creators
 * @name index.js<actions>
 * @author MO Kweon
 * @license
 */

import axios from "axios";

// action types
export const FETCH_POSTS = "FETCH_POSTS";
export const CREATE_POST = "CREATE_POST";
export const FETCH_POST = "FETCH_SINGLE_POST";
export const DELETE_POST = "DELETE_SINGLE_POST";

// global constants
const ROOT_URL = "https://reduxblog.herokuapp.com/api/posts";
const API_KEY = "KEY123";

// actions
export function fetchPosts() {
  const request = axios.get(ROOT_URL, {
    params: {
      key: API_KEY,
    },
  });

  return {
    type: FETCH_POSTS,
    payload: request,
  };
}

export function createPost(values, callback) {
  const request = axios
    .post(`${ROOT_URL}?key=${API_KEY}`, values)
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request,
  };
}

export function fetchPost(id) {
  const url = `${ROOT_URL}/${id}?key=${API_KEY}`;
  const request = axios.get(url);

  return {
    type: FETCH_POST,
    payload: request,
  };
}

export function deletePost(id, callback) {
  const url = `${ROOT_URL}/${id}?key=${API_KEY}`;
  const request = axios.delete(url).then(() => callback());

  return {
    type: DELETE_POST,
    payload: id,
  };
}
