/**
 * 请求工具库
 */

import axios from 'axios'
import cookies from '@/utils/cookies'
import router from '@/router'
import { useUserStore } from '@/store'

import { TOKEN, WHITE_CODE_LIST, LOGIN_ERROR_CODE } from '@/config/constant'

const env = import.meta.env

class HttpRequest {
  constructor() {
    this.baseUrl = this.getBaseUrl()
    this.withCredentials = true
    this.timeout = 60 * 60 * 24 * 1000
  }

  getBaseUrl() {
    if (env.VITE_API_MOCK === 'false') {
      return env.VITE_BACKEND_API_URL + env.VITE_BACKEND_API_PREFIX
    }
    return env.VITE_BACKEND_API_PREFIX
  }

  getConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    return config
  }

  getParams(payload) {
    const { method, data } = payload
    if (['post', 'put', 'patch', 'delete'].indexOf(method) >= 0) {
      payload.data = data
    } else {
      payload.params = data
      delete payload.data
    }
    return payload
  }

  checkStatus(status) {
    const statusMessageMap = {
      400: '错误请求',
      401: '未授权，请重新登录',
      403: '拒绝访问',
      404: '请求错误,未找到该资源',
      405: '请求方法未允许',
      408: '请求超时',
      420: '账号或者密码错误',
      500: '服务器端出错',
      501: '网络未实现',
      502: '网络错误',
      503: '服务不可用',
      504: '网络超时',
      505: 'http版本不支持该请求',
    }

    return statusMessageMap[status] || '连接错误'
  }

  // 拦截处理
  setInterceptors(instance) {
    const that = this

    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        if (!navigator.onLine) {
          ElMessage({
            message: '请检查您的网络是否正常',
            type: 'error',
            duration: 3 * 1000,
          })
          return Promise.reject(new Error('请检查您的网络是否正常'))
        }
        const token = cookies.get(TOKEN)
        if (token) {
          config.headers.Authorization = 'Bearer ' + token
        }
        // config.data = qs.stringify( config.data )

        return config
      },
      (error) => {
        return Promise.reject(new Error(error))
      }
    )

    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        const result = res.data
        const type = Object.prototype.toString.call(result)

        // const $config = res.config

        // 如果是文件流 直接返回
        if (type === '[object Blob]' || type === '[object ArrayBuffer]') {
          return result
        } else {
          const { code, message } = result
          const isErrorToken = LOGIN_ERROR_CODE.find((item) => item.code == code)
          const isWhiteCode = WHITE_CODE_LIST.find((item) => item.code == code)

          const userStore = useUserStore()

          if (isErrorToken) {
            userStore.login_out()
            router.push('/login')
            window.location.reload()
          } else if (!isWhiteCode) {
            ElMessage({
              message: message || 'Error',
              type: 'error',
              duration: 3 * 1000,
            })
            return Promise.reject(new Error(message || 'Error'))
          } else {
            return result
          }
        }
        return result
      },
      (error) => {
        if (error && error.response) {
          error.message = that.checkStatus(error.response.status)
        }
        const isTimeout = error.message.includes('timeout')
        ElMessage({
          message: isTimeout ? '网络请求超时' : error.message || '连接到服务器失败',
          type: 'error',
          duration: 2 * 1000,
        })
        return Promise.reject(new Error(error.message))
      }
    )
  }

  request(options) {
    const instance = axios.create()
    const baseConfig = this.getConfig()
    const params = Object.assign({}, baseConfig, this.getParams(options))
    this.setInterceptors(instance)
    return instance(params)
  }
}

const http = new HttpRequest()
export default http
