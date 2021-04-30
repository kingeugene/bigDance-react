import { IRoutesType } from "Interfaces/app";
import Login from "Pages/Login/Login";
import SettingsPage from "Pages/SettingsPage/SettingsPage";
import WelcomePage from "Pages/WelcomePage/WelcomePage";

const routes: IRoutesType = {
    welcome: {
        name: "Расписание",
        path: "/",
        component: WelcomePage,
        exact: true,
        meta: {
            title: "Welcome",
            requiresAuth: true,
        },
    },
    login: {
        name: "Логин",
        path: "/login",
        component: Login,
        meta: {
            title: "Login",
            requiresAuth: false,
        },
    },
    settings: {
        name: "Настройки",
        path: "/settings",
        component: SettingsPage,
        meta: {
            title: "Login",
            requiresAuth: true,
            requiresAdmin: true,
        },
    },
};

export default routes;
