import axios from 'axios'
import { retrieveUserToken } from './auth'

// const ROOT_URL = 'https://dashboard.heroku.com/apps/nomi-menu-service/api'
const ROOT_URL = 'http://localhost:3000/api'


export default class Client {
    static login = (email, pass) => {
        return axios.post(ROOT_URL + '/user/login', {
            email: email,
            password: pass
        })
    }

    static getDishes = () => {
        let token = retrieveUserToken(); // get user auth token
        return axios.get(ROOT_URL + '/dishes-by-category', {headers: {Authorization: `Bearer ${token}`}})
    }

    static getDish = (id) => {
        let token = retrieveUserToken(); // get user auth token
        return axios.get(ROOT_URL + '/dishes/' + id, {headers: {Authorization: `Bearer ${token}`}})
    }

    static updateDish = (id, data) => {
        let token = retrieveUserToken(); // get user auth token
        return axios.put(ROOT_URL + '/dishes/' + id, data, {headers: {Authorization: `Bearer ${token}`}})
    }

    static setMenu = (data) => {
        let token = retrieveUserToken();
        return axios.post(ROOT_URL + '/uploadMenuCSV',
        {
          data: data
        },
        {
          headers: {Authorization: `Bearer ${token}`}
        }
        )
    }
}
