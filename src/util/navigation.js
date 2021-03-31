import { navigate } from "gatsby";

export default class Navigation {
  static allMenus = () => {
    navigate("/dashboard");
  };

  static table = (menuId) => {
    navigate(`/dashboard/restaurantId/table/${menuId}`);
  };

  static dish = (menuId, dishId) => {
    navigate(`/dashboard/restaurantId/dish/${menuId}/${dishId ?? "create"}`);
  };

  static category = (menuId, categoryId) => {
    navigate(
      `/dashboard/restaurantId/category/${menuId}/${categoryId ?? "create"}`
    );
  };
}
