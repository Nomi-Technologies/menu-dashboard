import { navigate } from 'gatsby';

export default class Navigation {
    static allMenus = () => {
        navigate('/dashboard/all-menus')
    }

    static table = (menuId) => {
        navigate('/dashboard/table', { state: { menuId } })
    }

    static dish = (dishId, menuId, create) => {
        navigate('/dashboard/dish', { state: { dishId, menuId, create } })
    }

    static category = (categoryId, menuId, create) => {
        navigate('/dashboard/category', { state: { categoryId, menuId, create } })
    }
};