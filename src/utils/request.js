import axios from 'axios'
import { ElMessage } from 'element-plus'
//创建axios实例
const service = axios.create({
  baseURL: '/api', //请求基础路径
  timeout: 5000 //请求超时时间
})
//创建一个请求拦截器
service.interceptors.request.use(
  config => {
    //在发送请求之前做些什么
    //获取token，存在缓存中，本地
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  error => {
    //对请求错误做些什么
    return Promise.reject(error)
  }
)
//创建一个响应拦截器
service.interceptors.response.use(
  response => {
    //对响应数据做点什么
    //对返回的数据做处理
    const { data, config } = response
    //处理业务的判断，请求状态码和业务状态码
    //如果返回的状态码是200，说明请求成功
    if (data.code === '200') {
      return data.data
    } else {
      if (data.code === '-1') {
        //请求超时，那么就要重新登录，分为两种情况
        //1.如果是登录页，那么就不处理
        if (!config.url?.includes('/login')) {
          ElMessage.error(data.msg || '请求超时，请重新登录')
          //2.如果不是登录页，那么就重新登录
          //清除登录token
          localStorage.removeItem('token')
          //清除用户信息
          localStorage.removeItem('userInfo')
          //跳转到登录页
          window.location.href = '/auth/login'
        }
      } else {
        //所有错误情况都返回错误信息
        ElMessage.error(data.msg || '网络请求失败')
        return Promise.reject('网络请求失败')
      }
    }
  },
  error => {
    //对响应错误做点什么
    return Promise.reject(error)
  }
)
//对外暴露service
export default service