import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  CreateNewPost,
  GetAllPosts,
  RemovePost,
  SetPostForm,
  SetUserLikes,
  CreateLike,
  RemoveLike
} from '../store/actions/PostActions'
import { SetProtectedRoute } from '../store/actions/AuthActions'

const mapStateToProps = ({ postState }) => {
  return { postState }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPosts: () => dispatch(GetAllPosts()),
    addNewPost: (body) => dispatch(CreateNewPost(body)),
    removePost: (id) => dispatch(RemovePost(id)),
    setProtectedRoute: () => dispatch(SetProtectedRoute()),
    setPostForm: (body) => dispatch(SetPostForm(body)),
    createLike: (postId) => dispatch(CreateLike(postId)),
    removeLike: (postId) => dispatch(RemoveLike(postId))
  }
}

const ContributePage = (props) => {
  const {
    postState,
    fetchAllPosts,
    addNewPost,
    removePost,
    setProtectedRoute,
    setPostForm,
    createLike,
    removeLike
  } = props

  const handleDelete = (post) => {
    removePost(post.id)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPostForm({ ...postState.postForm, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    addNewPost(postState.postForm)
  }

  const handleAddLike = (id) => {
    createLike({ post_id: id })
  }

  const handleRemoveLike = (postId) => {
    let likeId = null
    postState.userLikes.forEach((like) => {
      if (like.post_id === postId) {
        likeId = like.id
      }
    })
    removeLike(likeId)
  }

  useEffect(() => {
    fetchAllPosts()
    setProtectedRoute()
  }, [])

  const allPosts = postState.posts.map((post, index) => {
    let liked = false
    post.likes.forEach((like, index) => {
      if (like.user_id === postState.userId) {
        liked = true
      }
    })
    return (
      <div key={index}>
        <h1>{post.title}</h1>
        <h3>Likes: {post.likes.length}</h3>
        <button
          onClick={
            liked
              ? () => handleRemoveLike(post.id)
              : () => handleAddLike(post.id)
          }
        >
          {liked ? 'Remove like' : 'Add Like'}
        </button>
        <img className="post-img" src={post.image} />
        {postState.userId === post.user_id ? (
          <button onClick={() => handleDelete(post)}>Delete</button>
        ) : null}
      </div>
    )
  })

  return (
    <div className="jan-section">
      <div>{allPosts}</div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="title"
          onChange={handleChange}
          value={postState.postForm.title}
        />
        <input
          name="image"
          placeholder="image"
          onChange={handleChange}
          value={postState.postForm.image}
        />
        <input
          name="bio"
          placeholder="bio"
          onChange={handleChange}
          value={postState.postForm.bio}
        />
        <button>post</button>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContributePage)
