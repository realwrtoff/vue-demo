import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getCookie } from '@/config/util'

//创建axios实例
const ajax = axios.create({
    baseURL: "http://127.0.0.1:8888/api/",    // api的base_url
    timeout: 5000                                 // 请求超时时间
});

//请求拦截器
ajax.interceptors.request.use(function (config) {
    //发送请求之前
    const token = getCookie('token'); //获取Cookie
    //console.log("token:"+token);
    if (token !== "") {
        config.headers["Authorization"] = 'token ' + token;  //Authorization:token token_valu
    }
    return config;
}, function (error) {
    //请求错误
    console.log("ajax-request-error");
    console.log(error);
    return Promise.reject(error);
});

//响应拦截器
ajax.interceptors.response.use(function (response) {
    console.log('interceptors', response);
    //响应数据处理
    return response.data;
}, function (error) {
    //请求错误
    console.log("ajax-response-error");
    console.log(error);

    //401 token 验证错误 返回登录
    if (error.response.status === 401) {
        router.push('/');
    }

    //错误信息
    Message.error(error.response.data.message);

    return Promise.reject(error.response.data);
});

export default ajax
