import { Hash } from "./index";

export type CommonResponse<TResponse = any> =
    | ISuccessResponse<TResponse>
    | IErrorResponse;

interface ISuccessResponse<TResponse = any> {
    _token: string;
    status: number;
    response: TResponse;
    notification: string;
    warning: string;
    errors: null;
}

interface IErrorResponse {
    _token: string;
    response: null;
    status: number;
    notification: string;
    warning: string;
    errors: Hash<string[]>;
}
