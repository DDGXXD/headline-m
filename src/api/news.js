import * as url from '@/conststans/api'
import req from '@/utils/request'

/**
 *@return { Promise<{ message: string, data: object }>}
 *@discriptions 获取 评论
 */
export function getNewsDiscussAxios(params) {
  return req({
    url: url.DISCUSS,
    method: 'GET',
    params
  })
}

/**
 * @param { { target: string, content: string, art_id: string} } params
 *@return { Promise<{ message: string, data: object }> }
 *@discriptions 发送 评论
 */
export function sendNewsDiscussAxios(params) {
  return req({
    url: url.DISCUSS,
    method: 'POST',
    data: params
  })
}

/**
 * @param { { target: string} } params
 *@return { Promise<{ message: string, data: object }> }
 *@discriptions 获取 评论  评论的评论
 */
export function sendLikeCount(params) {
  return req({
    url: url.DISCUSS,
    method: 'POST',
    data: params
  })
}

/**
 * @param { { target: string } } params
 *@return { Promise<{ message: string, data: object }> }
 *@discriptions 评论 点赞
 */
export function sendNewsDiscussReply(params) {
  return req({
    url: url.LIKEDISCUSS,
    method: 'POST',
    data: params
  })
}

/**
 * @param { { target: string } } params
 *@return { Promise<{ message: string, data: object }> }
 *@discriptions 取消 评论 点赞
 */
export function sendCancleLike(params) {
  return req({
    url: url.CANCELLIKE + params,
    method: 'DELETE'
  })
}

/**
 * @param { { target: string } } params
 *@return { Promise<{ message: string, data: object }> }
 *@discriptions 文章 点赞
 */
export function sendLikeArticle(params) {
  return req({
    url: url.LIKEARTICLE,
    method: 'POST',
    data: params
  })
}

/**
 * @param { { target: string } } params
 *@return { Promise<{ message: string, data: object }> }
 *@discriptions 取消 文章 点赞
 */
export function cancleLikeAeticle(params) {
  return req({
    url: url.CANLELIKEARTICLE + params,
    method: 'DELETE'
  })
}

/**
 * @param { { target: string } } params
 *@return { Promise<{ message: string, data: object }> }
 *@discriptions 收藏 文章
 */
export function OnArticleCollect(params) {
  return req({
    url: url.COLLECT,
    method: 'POST',
    data: params
  })
}

/**
 * @param { { target: string } } params
 *@return { Promise<{ message: string, data: object }> }
 *@discriptions 取消 文章 收藏
 */
export function cancleArticleCollect(params) {
  return req({
    url: url.CANCLECOLLECT + params,
    method: 'DELETE'
  })
}
