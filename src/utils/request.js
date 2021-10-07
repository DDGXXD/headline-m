import axios from 'axios'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 响应 拦截器
request.interceptors.response.use((res) => {
  if (res.status === 401) {
    // 验证失败 跳到登录页
    window.location.href = 'login.html'
  }
})
export default request
