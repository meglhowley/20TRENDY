import Client from '.'

export const PostTrend = async (body) => {
  try {
    const user = await Client.get('/auth/login')
    const res = await Client.post('/trends', {
      ...body,
      ['user_id']: user.data.id
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateTrend = async (id, body) => {
  try {
    const res = await Client.put(`/trends/${id}`, body)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteTrend = async (id) => {
  try {
    const res = await Client.delete(`/trends/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetTrendsByDate = async (timeFrame) => {
  try {
    const res = await Client.get(`/trends/date/${timeFrame}`)
    return res.data
  } catch (error) {
    throw error
  }
}
