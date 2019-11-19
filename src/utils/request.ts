import Taro from '@tarojs/taro'
import {Toast} from '@/src/utils'

interface RequestConfig {
  url: string,
  data?: any,
  header?: object
}

// @ts-ignore
let baseUrl: string = BASE_URL;
let defaultHeader = {
  'content-type': 'application/json',
  // platform: 'manager',
}
export function post({
    url, data, header = {
    ...defaultHeader,
    token: Taro.getStorageSync('token')
  }
}: RequestConfig): any {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await Taro.request({
        url: baseUrl + url,
        data: data,
        method: 'POST',
        header: header,
      })
      if (res.data.ret) {
        Toast({
          title: res.data.des
        })
        if(res.data.ret === 10304){
          Taro.redirectTo({
            url: '/pages/login/login'
          })
        }
        reject(res.data)
      } else {
        resolve(res.data)
      }
    } catch (error) {
      Toast({title: '服务器异常'})
      reject(error)
    }
  })
}

export function get({
    url, data, header = {
    ...defaultHeader,
    token: Taro.getStorageSync('token')
  }
}: RequestConfig): any {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await Taro.request({
        url: baseUrl + url,
        data: data,
        method: 'GET',
        header: header,
      })
      if (res.data.ret) {
        Toast({
          title: res.data.des
        })
        if(res.data.ret === 10304){
          Taro.redirectTo({
            url: '/pages/login/login'
          })
        }
        reject(res.data)
      } else {
        resolve(res.data)
      }
    } catch (error) {
      Toast({title: '服务器异常'})
      reject(error)
    }
  })
}


