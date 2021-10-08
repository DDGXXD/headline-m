import axios from 'axios'
import { Notify } from 'vant'

const request = axios.create({
})

// 响应 拦截器
request.interceptors.response.use((res) => {
  if (res.status === 401) {
    // 验证失败 跳到登录页
    window.location.href = 'login.html'
  }
  return res
})

// 请求拦截器
request.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('TOKEN')
  return config
})
export default request

/**
 * @param {Promise<T>} PromiseInstace
 * @returns { Promise<T>}
 * @description 对请求成功 失败 promise的封装 增强服用
 */
export function withMsg(promiseInstace) {
  return new Promise((resolve, reject) => {
    promiseInstace
      .then((res) => {
        Notify({ type: 'success', message: res.data.message })
        resolve(res)
      })
      .catch((err) => {
        Notify({ type: 'primary', message: err.response.data.message })
        reject(err)
      })
  })
}
