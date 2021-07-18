import { GetUserLikes, PostLike, DeleteLike } from '../../services/LikeService'
import {
  CreatePost,
  GetPosts,
  DeletePost,
  GetLikesByPostId
} from '../../services/PostService'

import {
  NEW_POST,
  SET_POSTS,
  DELETE_POST,
  SET_POST_FORM,
  GET_LIKES_BY_POST,
  SET_USER_LIKES,
  POST_NEW_LIKE,
  DELETE_LIKE
} from '../types'

export const CreateNewPost = (body) => {
  return async (dispatch) => {
    try {
      const res = await CreatePost(body)
      dispatch({ type: NEW_POST, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const GetAllPosts = () => {
  return async (dispatch) => {
    try {
      const res = await GetPosts()
      dispatch({ type: SET_POSTS, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const RemovePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await DeletePost(id)
      dispatch({ type: DELETE_POST, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const FetchLikesByPostId = (id) => {
  return async (dispatch) => {
    try {
      const res = await GetLikesByPostId(id)
      dispatch({ type: GET_LIKES_BY_POST, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const SetPostForm = (body) => ({
  type: SET_POST_FORM,
  payload: body
})

export const SetUserLikes = () => {
  return async (dispatch) => {
    try {
      const res = await GetPosts()
      dispatch({ type: SET_POSTS, payload: res })
      const userlikes = await GetUserLikes()
      dispatch({ type: SET_USER_LIKES, payload: userlikes })
    } catch (error) {
      throw error
    }
  }
}

export const CreateLike = (body) => {
  return async (dispatch) => {
    try {
      const res = await PostLike(body)
      dispatch({ type: POST_NEW_LIKE, payload: res })
    } catch (error) {
      throw error
    }
  }
}

export const RemoveLike = (id) => {
  return async (dispatch) => {
    try {
      const res = await DeleteLike(id)
      dispatch({ type: DELETE_LIKE, payload: res })
    } catch (error) {
      throw error
    }
  }
}
