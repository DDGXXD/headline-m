import req from '@/utils/request'
import * as url from '@/conststans/api'

/**
 * @param { { mobile: string, code: string} } params
 * @returns { Promise<{ message: string, data: object }>}
 * @description 发送登录请求
 */
export function login(params) {
  return req({
    url: url.LOGIN,
    method: 'POST',
    data: params
  })
}

// /**
//  * @returns { Promise<{ message: string, data: object }>}
//  * @description 获取用户列表
//  */
// export function geiUserInfo() {
//   return req({
//     url: url.USER_PROFILE,
//     method: 'GET'
//   })
// }

/**
 * @param { string} mobile
 * @returns { Promise<{ message: string, data: object }>}
 * @description 获取验证码
 */
export function sendAuthCode(mobile) {
  return req({
    url: url.AUTHCODE + mobile,
    method: 'GET'
  })
}
