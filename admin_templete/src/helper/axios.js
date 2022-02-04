import axios from 'axios'
import { api } from '../urlConfig'


const token = localStorage.getItem('token')
const axiosInstance = axios.create({
  baseURL: api,
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Authorization':token?`bearer ${token}` :""
  },
  proxy: {
	  port: 8000
	},
  validateStatus: function (status) {
    return status >= 200 && status < 550; // default
  }
})

export default axiosInstance