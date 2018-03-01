import axios from 'axios'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const baseurl = 'http://mock.eolinker.com/msYyiNpbe8b67b7183c63a9f2e6cdef67d950c50ce62f6c?uri='
// axios.defaults.withCredentials = true;

export function Post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(baseurl + url, params)
            .then(response => {
                if (response.data.code == '1') {
                    resolve(response.data);
                }
            })
            .catch((error) => {
              console.log(error)
            })
    })
}
export function Get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(baseurl + url, {params:params})
            .then(response => {
                if (response.data.code == '1') {
                    resolve(response.data);
                }
            })
            .catch((error) => {
              console.log(error)
            })
    })
}
