import { Hash, IRoute } from "@Interfaces/index";
import WelcomePage from "@Pages/WelcomePage/WelcomePage";

const routes: Hash<IRoute> = {
    login: {
        name: "Login",
        path: "/login",
        component: WelcomePage,
        meta: {
            title: "Markets",
        },
    },
};

export default routes;
