import Client from '.'

export const GetUserLikes = async () => {
  try {
    const user = await Client.get('/auth/login')
    const res = await Client.get(`/user/likes/${user.data.id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const PostLike = async (body) => {
  try {
    const user = await Client.get('/auth/login')
    const res = await Client.post('/likes', {
      ...body,
      ['user_id']: user.data.id
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteLike = async (like_id) => {
  try {
    const res = await Client.delete(`/likes/${like_id}`)
    return res.data.payload
  } catch (error) {
    throw error
  }
}
