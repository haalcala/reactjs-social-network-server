import { UserType } from "./models/User";

export interface ExpressRequest<T, U> {
    user: UserType;
    params: T;
    body: U;
}

export interface ExpressResponse {
    _error?: string;
    _error_code?: number;
    _status?: string;
}
