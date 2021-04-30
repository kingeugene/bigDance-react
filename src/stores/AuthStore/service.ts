import ApiService from "Services/api";

export default class AuthService {
    public static login(body: IBLogin): ResponseApi<IRLogin> {
        return ApiService.post("login", body);
    }

    public static logout(): ResponseApi {
        return ApiService.post("logout");
    }

    public static getUserInfo(): ResponseApi<IRUserInfo> {
        return ApiService.get("user/info");
    }
}
