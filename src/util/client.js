import axios from "axios";
import { retrieveUserToken } from "./auth";
import { navigate } from "gatsby";

const ROOT_URL = process.env.GATSBY_API_URL;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("error: " + error);
    if (error.response.status === 401) {
      navigate("/login");
    }

    return Promise.reject(error);
  }
);

export default class Client {
  static login = (email, pass) => {
    return axios.post(ROOT_URL + "/user/login", {
      email: email,
      password: pass,
    });
  };

  static updatePassword = (currentPassword, newPassword) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.post(
      ROOT_URL + "/user/password",
      {
        password: currentPassword,
        newPassword: newPassword,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  static getDishes = () => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/dishes-by-category", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getDish = (id) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/dishes/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static updateDish = (id, data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.put(ROOT_URL + "/dishes/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static createDish = (data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.post(ROOT_URL + "/dishes/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static upsertDishImage = (id, data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.put(ROOT_URL + "/images/dishes/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getDishImage = (id) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/images/dishes/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static deleteDish = (id) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.delete(ROOT_URL + "/dishes/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static bulkDeleteDish = (menuId, dishes) => {
    let token = retrieveUserToken(); // get user auth token

    let config = {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        dishesToDelete: dishes,
      },
    };

    return axios.delete(
      ROOT_URL + `/menus/${menuId}/dishes/bulkDelete/`,
      config
    );
  };

  static bulkCreateDish = (data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.post(ROOT_URL + "/menus/bulkCreate/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static uploadCSV = (data, menuId, overwrite) => {
    let token = retrieveUserToken();
    let body = {
      data: data,
      overwrite: overwrite,
    };
    return axios.post(ROOT_URL + `/menus/${menuId}/uploadCSV/`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static favoriteMenu = (menuId, favorite) => {
    let token = retrieveUserToken();
    let body = {
      favorite: favorite,
    };
    return axios.post(ROOT_URL + `/menus/${menuId}/favorite-menu/`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getFavoriteMenus = () => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/user/favorite-menus", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static searchDishes = (data, menuId) => {
    let token = retrieveUserToken();
    let config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        searchInput: data,
        menuId: menuId,
      },
    };
    return axios.get(ROOT_URL + "/dishes-by-name", config);
  };

  static updateCategory = (id, data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.put(ROOT_URL + "/categories/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static createCategory = (data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.post(ROOT_URL + "/categories/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static deleteCategory = (id) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.delete(ROOT_URL + "/categories/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getCategory = (id) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/categories/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getAllCategoriesByMenu = (menuId) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/categories-by-menu/" + menuId, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static updateMenu = (id, data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.put(ROOT_URL + "/menus/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static createMenu = (data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.post(ROOT_URL + "/menus/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static deleteMenu = (id) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.delete(ROOT_URL + "/menus/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getMenu = (id) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/menus/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getAllMenus = () => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/all-menus/", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static duplicateMenu = (id) => {
    let token = retrieveUserToken(); // get user auth token
    let data;
    return axios.post(ROOT_URL + "/menus/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getTags = () => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/tags", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getDiets = () => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/diets", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static uploadMenu = (data) => {
    let token = retrieveUserToken();
    return axios.post(
      ROOT_URL + "/uploadMenuCSV",
      {
        data: data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  static registerRestaurant = (data) => {
    return axios.post(ROOT_URL + "/restaurants/register", data);
  };

  static registerUser = (data) => {
    return axios.post(ROOT_URL + "/user/register", data);
  };

  static checkEmail = (email) => {
    return axios.get(ROOT_URL + "/user/check-email", {
      params: { email: email },
    });
  };

  static getPersonalInfo = () => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/user/details/", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static updatePersonalInfo = (data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.put(ROOT_URL + "/user/details/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getRestaurantInfo = () => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + "/restaurants/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static updateRestaurantInfo = (id, data) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.put(ROOT_URL + "/restaurants/" + id, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getRestaurantLogo = (id) => {
    return axios.get(`${ROOT_URL}/images/restaurants/${id}`);
  };

  static upsertRestaurantLogo = (id, data) => {
    let token = retrieveUserToken();
    return axios.put(`${ROOT_URL}/images/restaurants/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static downloadCSV = (menuId) => {
    let token = retrieveUserToken(); // get user auth token
    return axios.get(ROOT_URL + `/menus/${menuId}/csv`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static updateDishOrder = (id, order) => {
    let token = retrieveUserToken();
    let data = {
      order: order,
    };
    return axios.put(ROOT_URL + "/menus/" + id + "/update-dish-order", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static toggleFiltering = (menuId, enableFiltering) => {
    let token = retrieveUserToken(); // get user auth token
    console.log(token);
    console.log(menuId);
    return axios.put(
      ROOT_URL + `/menus/${menuId}/toggle-filtering`,
      {
        enableFiltering: enableFiltering,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  static updateCategoryOrder = (id, order) => {
    let token = retrieveUserToken();
    let data = {
      order: order,
    };
    return axios.put(
      ROOT_URL + "/menus/" + id + "/update-category-order",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  static getAllModifications = () => {
    let token = retrieveUserToken();
    return axios.get(ROOT_URL + `/modifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static createModification = (modification) => {
    let token = retrieveUserToken();
    return axios.post(ROOT_URL + "/modifications", modification, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static updateModification = (id, modification) => {
    let token = retrieveUserToken();
    return axios.put(`${ROOT_URL}/modifications/${id}`, modification, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
}
