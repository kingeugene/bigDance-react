import ApiService from "Services/api";

export default class SettingsService {
    public static getVenues(): ResponseApi<IRVenues> {
        return ApiService.get("v0/venues");
    }

    public static getRooms(): ResponseApi<IRRooms> {
        return ApiService.get("v0/venues/objects");
    }
}
