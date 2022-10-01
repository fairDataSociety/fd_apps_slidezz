import axios from './customAxios'

interface LoginData {
  user_name: string
  password: string
}

interface LoginResponse {
  code: number
  message: string
}

export async function login(data: LoginData): Promise<LoginResponse> {
  return axios.post('user/login', data)
}

export async function logout(): Promise<LoginResponse> {
  return axios.post('user/logout')
}
