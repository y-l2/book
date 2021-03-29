import axios from 'axios'
import qs from 'qs';
import { getToken } from './function'
// import { Indicator } from 'mint-ui';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // Indicator.open('加载中...');
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // Indicator.close();
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export const post = (name = '', data = {})  => {
    const url = `${name}`

    let token = getToken()
    console.log(`token=${token}`)

    return axios({
        method: 'POST',
        url,
        data,
        headers: {
            token
        }
    })
};

export const postRequest = (name = '', data = {}) => {
    let token = getToken()
    const url = `${name}`
    window.console.log(url);
    return axios({
        method: 'POST',
        headers: {
            token,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url,
        data: qs.stringify(data)
    });
}

export const get = (url) => {
    return axios({
        method: 'get',
        url
    });
}

export const gets = (url) => {

    let token = getToken()

    return axios({
        method: 'get',
        headers: {
            token
        },
        url
    });
}


export const newPost = (url = '', data = {})  => {
    let token = getToken()

    return axios({
        method: 'POST',
        headers: {
            token
        },
        url,
        data
    })
};

export const put = ( url = '',  data = {}) => {
    let token = getToken()

    return axios({
        method: 'PUT',
        headers: {
            token
        },
        url,
        data
    })
}

export const del = ( url = '') => {
    let token = getToken()

    return axios({
        method: 'DELETE',
        headers: {
            token
        },
        url
    })
}