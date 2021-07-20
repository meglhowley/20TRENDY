import React, { useEffect, useRef, useState } from 'react'
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
import Heart from 'react-animated-heart'
import DownArrowBlack from '../components/DownArrowBlack'
import { Modal } from 'react-rainbow-components'

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

  const postsRef = useRef()
  const [modalOpen, toggleModalOpen] = useState(false)

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

  const scroll = (scrollOffset) => {
    postsRef.current.scrollLeft += scrollOffset
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
      <div className="post-card" key={index}>
        <div className="post-title">{post.title}</div>
        <img className="post-img" src={post.image} />
        <div className="liked-div">
          <Heart
            className="heart"
            width={50}
            isClick={liked}
            onClick={
              liked
                ? () => handleRemoveLike(post.id)
                : () => handleAddLike(post.id)
            }
          />
          <div>{post.likes.length}</div>
        </div>
        {postState.userId === post.user_id ? (
          <button onClick={() => handleDelete(post)}>Delete</button>
        ) : null}{' '}
      </div>
    )
  })

  return (
    <div ref={props.contributePageRef} className="page-section">
      <h2>Archives of 2020</h2>
      <p>Witnessed something uniquely 2020?</p>
      <br />
      <div className="scroll-btns">
        <button className="scroll" onClick={() => scroll(-500)}>
          ◄
        </button>
        <button
          onClick={() => {
            toggleModalOpen(true)
          }}
          className="contribute-btn"
        >
          Contribute to Collection
        </button>
        <button className="scroll" onClick={() => scroll(500)}>
          ►
        </button>
      </div>
      <br />
      <div ref={postsRef} className="posts-container">
        {allPosts}
      </div>{' '}
      <div
        onClick={() =>
          props.poemPageRef.current.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className="next contribute"
      >
        <DownArrowBlack />
      </div>
      <div>
        <Modal isOpen={modalOpen} onRequestClose={() => toggleModalOpen(false)}>
          <div className="form-container">
            <h3>Contribute Photo to Collection</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="title"
                onChange={handleChange}
                value={postState.postForm.title}
              />
              <br />
              <input
                name="image"
                placeholder="image"
                onChange={handleChange}
                value={postState.postForm.image}
              />
              <br />
              <input
                name="bio"
                placeholder="bio"
                onChange={handleChange}
                value={postState.postForm.bio}
              />
              <br />
              <button>post</button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContributePage)
