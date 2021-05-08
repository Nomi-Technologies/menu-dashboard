import { navigate } from "gatsby";

export default class Navigation {
  static allRestaurants = () => {
    navigate("/dashboard");
  };

  static restaurant = (restoId) => {
    navigate(`/dashboard/${restoId}`);
  };

  static menu = (restoId, menuId) => {
    navigate(`/dashboard/${restoId}/menu/${menuId}`);
  };

  static dish = (restoId, menuId, dishId) => {
    navigate(`/dashboard/${restoId}/dishes/${menuId}/${dishId ?? "create"}`);
  };

  static category = (restoId, menuId, categoryId) => {
    navigate(
      `/dashboard/${restoId}/categories/${menuId}/${categoryId ?? "create"}`
    );
  };
}
