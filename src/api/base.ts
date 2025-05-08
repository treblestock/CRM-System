const BASE_URL = 'https://easydev.club/api/v1'
import axios from 'axios'
export { type AxiosResponse } from 'axios'

export const axiosBase = axios.create({
  baseURL: BASE_URL
})