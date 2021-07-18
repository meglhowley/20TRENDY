import Client from '.'

export const CreatePost = async (body) => {
  try {
    const user = await Client.get('/auth/login')
    const res = await Client.post('/posts', {
      ...body,
      ['user_id']: user.data.id
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetPosts = async (body) => {
  try {
    const res = await Client.get('/posts')
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeletePost = async (id) => {
  try {
    const res = await Client.delete(`/posts/${id}`)
    return res.data.payload
  } catch (error) {
    throw error
  }
}

export const GetLikesByPostId = async (id) => {
  try {
    const res = await Client.get(`/posts/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
