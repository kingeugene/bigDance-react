import { ApisauceInstance, create } from "apisauce";
import lockr from "lockr";
import { JWT_TOKEN } from "utils/constants";
import Notify from "utils/notification";

import routes from "../routes/routes";

export const api: ApisauceInstance = create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${lockr.get(JWT_TOKEN)}`,
    },
    timeout: 10000,
});

api.addResponseTransform((response) => {
    if (response.status === 401) {
        Notify.error(response.data.error);

        if (lockr.get(JWT_TOKEN)) {
            lockr.rm(JWT_TOKEN);
        }

        if (window.location.pathname !== routes.login.path) {
            window.location.reload();
        }
    }
});

export function handleFetch<T>(
    data: CommonResponse<T>,
    isNotifySuccess: boolean
): ResponseApi<T> {
    if (!data || data?.error) {
        Notify.error(data ? data.error : "Что то пошло не так");
        return Promise.reject(data ? data.error : "Error");
    }

    if (isNotifySuccess) {
        setTimeout(() => {
            Notify.success("Запрос успешен");
        }, 500);
    }

    return Promise.resolve(data);
}
