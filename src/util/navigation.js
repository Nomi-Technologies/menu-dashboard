import { navigate } from "gatsby"

export default class Navigation {
  static allMenus = () => {
    navigate("/dashboard/all-menus")
  }

  static table = menuId => {
    navigate(`/dashboard/table/${menuId}`)
  }

  static dish = (menuId, dishId) => {
    navigate(`/dashboard/dish/${menuId}/${dishId ?? "create"}`)
  }

  static category = (categoryId, menuId, create) => {
    navigate("/dashboard/category", { state: { categoryId, menuId, create } })
  }
}
