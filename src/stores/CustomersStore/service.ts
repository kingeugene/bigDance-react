import ApiService from "Services/api";

export default class CustomersService {
    public static login(body: IBLogin): ResponseApi<IRLogin> {
        return ApiService.post("login", body);
    }

    public static getUserInfo(): ResponseApi<IRUserInfo> {
        return ApiService.get("user/info");
    }
}
