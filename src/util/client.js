import axios from 'axios'
import { retrieveUserToken } from './auth'

const ROOT_URL = process.env.GATSBY_API_URL


export default class Client {
    static login = (email, pass) => {
        return axios.post(ROOT_URL + '/user/login', {
            email: email,
            password: pass
        })
    }

    static getDishes = () => {
        let token = retrieveUserToken(); // get user auth token
        console.log(ROOT_URL + '/dishes-by-category')
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

    static createDish = (data) => {
        let token = retrieveUserToken(); // get user auth token
        return axios.post(ROOT_URL + '/dishes/', data, {headers: {Authorization: `Bearer ${token}`}})
    }  
    
    static deleteDish = (id) => {
        let token = retrieveUserToken(); // get user auth token
        return axios.delete(ROOT_URL + '/dishes/' + id, {headers: {Authorization: `Bearer ${token}`}})
    }

    static updateCategory = (id, data) => {
        let token = retrieveUserToken(); // get user auth token
        return axios.put(ROOT_URL + '/categories/' + id, data, {headers: {Authorization: `Bearer ${token}`}})
    }

    static createCategory = (data) => {
        let token = retrieveUserToken(); // get user auth token
        return axios.post(ROOT_URL + '/categories/', data, {headers: {Authorization: `Bearer ${token}`}})
    }  
    
    static deleteCategory = (id) => {
        let token = retrieveUserToken(); // get user auth token
        return axios.delete(ROOT_URL + '/categories/' + id, {headers: {Authorization: `Bearer ${token}`}})
    }

    static getCategory = (id) => {
        let token = retrieveUserToken(); // get user auth token
        return axios.get(ROOT_URL + '/categories/' + id, {headers: {Authorization: `Bearer ${token}`}})
    }

    static getTags = () => {
        let token = retrieveUserToken(); // get user auth token
        return axios.get(ROOT_URL + '/tags', {headers: {Authorization: `Bearer ${token}`}})
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
