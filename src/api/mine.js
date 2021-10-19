import * as url from '@/conststans/api'
import req from '@/utils/request'

/**
 * @returns { Promise<{ message: string, data: object }>}
 * @description 发送用户自身信息请求
 */
export function getUserInfo() {
  return req({
    url: url.SELF,
    method: 'GET'
  })
}
