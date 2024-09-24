const TOKEN_KEY = 's-accessToken'
const TOKEN_KEY2 = 's-refreshToken'

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || ''
}

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export { isLogin, getToken, setToken, clearToken, TOKEN_KEY, TOKEN_KEY2 }
