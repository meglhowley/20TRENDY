import Client from '.'

export const ProtectedRoute = async () => {
  const user = await Client.get('/auth/login')
  return user.data.id
}

export const Register = async (body) => {
  try {
    const res = await Client.post('/auth/register', body)
    return res.data
  } catch (error) {
    return 'Email already in use'
  }
}

export const Login = async (body) => {
  try {
    const res = await Client.post('/auth/login', body)
    return res.data
  } catch (error) {
    return 'Invalid Credentials. Please try again'
  }
}
