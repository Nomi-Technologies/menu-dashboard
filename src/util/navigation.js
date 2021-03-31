import { navigate } from "gatsby";

export default class Navigation {
  static allMenus = () => {
    navigate("/dashboard");
  };

  static table = (menuId) => {
    navigate(`/dashboard/table/${menuId}`);
  };

  static dish = (menuId, dishId) => {
    navigate(`/dashboard/dish/${menuId}/${dishId ?? "create"}`);
  };

  static category = (menuId, categoryId) => {
    navigate(`/dashboard/category/${menuId}/${categoryId ?? "create"}`);
  };
}
