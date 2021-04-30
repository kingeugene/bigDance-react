import { ApiResponse } from "apisauce";

import { api, handleFetch } from "./config";

export default class ApiService {
    public static get<T>(
        url: string,
        request?: any,
        isNotifySuccess = false
    ): ResponseApi<T> {
        return api
            .get(url, request)
            .then((response: ApiResponse<any>) => response.data)
            .then((data) => handleFetch<T>(data, isNotifySuccess));
    }

    public static post<T>(
        url: string,
        body: any = {},
        request?: any,
        isNotifySuccess = true
    ): ResponseApi<T> {
        return api
            .post(url, body, request)
            .then((response: ApiResponse<any>) => response.data)
            .then((data) => handleFetch<T>(data, isNotifySuccess));
    }
}
