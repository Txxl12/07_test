import axios from 'axios';
import qs from 'querystring'
import { Toast } from 'vant'
// var baseURL = 'http://ding.local.me/'
// var orderBaseURL = 'http://order.local.me/'

var baseURL = 'http://event.linduky.com/'

import store from '@/store/index.js'

const request = axios.create({
    baseURL: baseURL,
    timeout: 120000,
    transformRequest: [function (data, headers) {
        let dataJson = qs.stringify(data);
        let query = dataJson ? dataJson : data;
        return query;
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
    }
})

request.interceptors.request.use(
    config => {
        for (var key in config.params) {
            if (typeof config.params[key] === 'string') {
                config.params[key] = config.params[key].trim()
            }
            if (!(config.params[key] || config.params[key] === 0 || config.params[key] === '0' || config.params[key] === false)) {
                delete config.params[key]
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (!response.data.code || response.data.code == 1000) {
                return response.data
            } else {
                if (response.data.msg) {
                    Toast.fail(response.data.msg);
                }
                return Promise.reject(response.data)
            }
        }
    },
    error => {
        if (error.response.status == 401) {
            Toast.fail('token已过期,请重新登录');
        } else {
            Toast.fail(error.response.data.message);
        }
        return Promise.reject(error);
    }
);
export { request };