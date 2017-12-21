import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POST:
      const post = action.payload.data;
      return {
        ...state,
        [post.id]: post,
      };
    default:
      return state;
  }
}
