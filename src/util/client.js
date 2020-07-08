import axios from "axios"
import { retrieveUserToken } from "./auth"

// const ROOT_URL = 'https://dashboard.heroku.com/apps/nomi-menu-service/api'
const ROOT_URL = "http://localhost:3000/api"

export default class Client {
  static login = (email, pass) => {
    return axios.post(ROOT_URL + "/user/login", {
      email: email,
      password: pass,
    })
  }

  static getDishes = () => {
    let token = retrieveUserToken() // get user auth token
    return axios.get(ROOT_URL + "/dishes-by-category", {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  static getDish = id => {
    let token = retrieveUserToken() // get user auth token
    return axios.get(ROOT_URL + "/dishes/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  static updateDish = (id, data) => {
    let token = retrieveUserToken() // get user auth token
    console.log(
      axios.put(ROOT_URL + "/dishes/" + id, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    )
    return axios.put(ROOT_URL + "/dishes/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  static getPersonalInfo = () => {
    let token = retrieveUserToken() // get user auth token
    return axios.get(ROOT_URL + "/user/details/", {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  static updatePersonalInfo = (id, data) => {
    console.log("data", data)
    let token = retrieveUserToken() // get user auth token
    return axios.put(ROOT_URL + "/user/details/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  static getRestaurantInfo = id => {
    let token = retrieveUserToken() // get user auth token
    return axios.get(ROOT_URL + "/restaurants/me", id, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  static updateRestaurantInfo = (id, data) => {
    let token = retrieveUserToken() // get user auth token
    return axios.put(ROOT_URL + "/restaurants/me/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
}
