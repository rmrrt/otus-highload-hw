export interface IUserRegisterRequest {
    first_name: string;
    last_name:  string;
    email:      string;
    password:   string;
    birthday:   string;
    sex:        string;
    interests:  string;
    city:       string;
}

export interface UserCreationResponse {
    status: string;
    error?: string;
}

export interface UserGetRequest {
    userId: string;
}
export interface UserGetResponse {
    first_name: string;
    last_name:  string;
    email:      string;
    password:   string;
    birthday:   string;
    sex:        string;
    interests:  string;
    city:       string;
}

export interface UserGetResponseError {
    error: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}