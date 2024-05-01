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