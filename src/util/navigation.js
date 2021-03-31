import { navigate } from "gatsby";

export default class Navigation {
  static allMenus = () => {
    navigate("/dashboard");
  };

  static table = (restoId, menuId) => {
    navigate(`/dashboard/${restoId}/table/${menuId}`);
  };

  static dish = (restoId, menuId, dishId) => {
    navigate(`/dashboard/${restoId}/dish/${menuId}/${dishId ?? "create"}`);
  };

  static category = (restoId, menuId, categoryId) => {
    navigate(
      `/dashboard/${restoId}/category/${menuId}/${categoryId ?? "create"}`
    );
  };
}
