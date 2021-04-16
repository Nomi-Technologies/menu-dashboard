import { navigate } from "gatsby";

export default class Navigation {
  static allMenus = () => {
    navigate("/dashboard");
  };

  static table = (restoId, menuId) => {
    navigate(`/dashboard/${restoId}/tables/${menuId}`);
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
