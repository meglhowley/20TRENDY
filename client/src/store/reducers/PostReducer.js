const {
  NEW_POST,
  SET_POSTS,
  SET_POST_FORM,
  SET_SELECTED_POST,
  DELETE_POST,
  SET_USER_ID,
  SET_USER_LIKES,
  POST_NEW_LIKE,
  DELETE_LIKE
} = require('../types')

const iState = {
  posts: [],
  postForm: {
    title: '',
    image: '',
    bio: ''
  },
  selectedPost: [],
  userId: [],
  userLikes: []
}

const PostReducer = (state = iState, action) => {
  switch (action.type) {
    case NEW_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case DELETE_POST:
      const postsCopy = [...state.posts]
      const filteredPosts = postsCopy.filter(
        (post) => post.id !== action.payload
      )
      return { ...state, posts: filteredPosts, selectedPost: action.payload }
    case SET_USER_ID:
      return { ...state, userId: action.payload }
    case SET_POST_FORM:
      return { ...state, postForm: action.payload }
    case SET_USER_LIKES:
      return { ...state, userLikes: action.payload.likes }
    case POST_NEW_LIKE:
      return { ...state, userLikes: [...state.userLikes, action.payload] }
    case DELETE_LIKE:
      const userLikesCopy = [...state.userLikes]
      const filteredLikes = userLikesCopy.filter(
        (like) => like.id !== action.payload
      )
      return { ...state, userLikes: filteredLikes }
    default:
      return { ...state }
  }
}

export default PostReducer
