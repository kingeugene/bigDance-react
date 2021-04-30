type ResponseApi<T = any> = Promise<CommonResponse<T>>;

type CommonResponse<TResponse = any> = TResponse & IErrorResponse;

type IErrorResponse = {
    error: string;
};

type userInfoRolesType = "root" | "customer";

interface IVenue {
    id: number;
    account_id: number;
    venue_id: number;
    color: string;
    interval: number;
    location: string;
    name: string;
    end_time: string;
    end_time_formated: string;
    start_time: string;
    start_time_formated: number;
}

interface IRoom {
    id: number;
    name: string;
    venue_id: number;
    venue_name: string;
}
