import * as url from '@/conststans/api'
import req from '@/utils/request'

/**
 * @returns { Promise<{ message: string, data: object }>}
 * @description 发送获取新闻分类
 */
export function getUserNews() {
  return req({
    url: url.NEWSLIST,
    method: 'GET'
  })
}

/**
 * @param { {channel_id: string, timestamp: string }}
 * @returns { Promise<{ message: string, data: object }>}
 * @description 根据 新闻ID 获取文章内容请求
 */
export function getNewsRecommend(params) {
  return req({
    url: url.NEWSTEXT,
    method: 'GET',
    params
  })
}

/**
 * @param { { string }} params
 * @returns { Promise<{ message: string, data: object }>}
 * @description 根据 search 获取新闻泪飙
 */
export function getSearchAxios(params) {
  return req({
    url: url.SEARCH,
    method: 'GET',
    params
  })
}

/**
 * @param { { string }} params 搜索 关键字词
 * @returns { Promise<{ message: string, data: object }>}
 * @description 根据 search 获取新闻泪飙
 */
export function getSearchAuto(params) {
  return req({
    url: url.SEARCHAUTO,
    method: 'GET',
    params
  })
}

/**
 * @returns { Promise<{ message: string, data: object }>}
 * @description 获取所有 频道
 */
export function getAllChannelAxios() {
  return req({
    url: url.ALLCHANNEL,
    method: 'GET'
  })
}

/**
 * @returns { Promise<{ message: string, data: object }>}
 * @description 获取用户 频道
 */
export function getUserChannelAxios() {
  return req({
    url: url.USERCHANNEL,
    method: 'GET'
  })
}

/**
 * @param { string } id 频道id
 * @returns { Promise<{ message: string, data: object }>}
 * @description 删除指定 用户 频道
 */
export function deleteUserChannelAxios(id) {
  return req({
    url: url.DELETCHANNEL + id,
    method: 'DELETE'
  })
}

/**
 * @param { Array<{ id: number, seq: string }>}
 * @returns { Promise<{ message: string, data: object }>}
 * @description 添加指定 用户 频道
 */
export function addUserChannelAxios(params) {
  return req({
    url: url.ADDUSERCHANNEL,
    method: 'PATCH',
    data: {
      channels: [params]
    }
  })
}

/**
 * @param { string } params
 * @returns { Promise<{ message: string, data: object }>}
 * @description 添加指定 用户 频道
 */
export function getNewsInfoAxios(params) {
  return req({
    url: url.NEWSINFO + params,
    method: 'GET'
  })
}
