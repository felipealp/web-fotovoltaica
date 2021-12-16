export enum FormCode {
    Ok = 200,
    ApiFail = 300
}

export enum UserStatus {
    NotConfirmed = 0,
    Okay = 1,
    ForgotPassword = 2,
    BlockedExceededLoginAttempts = 3
}

export enum MessageCode {
    Success = 200,
    Created = 201,
    Updated = 202,
    Deleted = 203,
    Destroyed = 204,
    NoResults = 300,
    NotFound = 400,
    InvalidModelState = 402,
    EmptyValue = 403,
    Expired = 405,
    AlreadyExists = 406,
    NullValue = 407,
    NotOkay = 408,
    Failed = 600,           
    InvalidParamValue = 601,
    Throttled = 602,
    ExceptionThrown = 501,
    AuthFailed = 500
}

export enum AuthMessageCode {
    Success = 200,
    InvalidFormat = 400,
    NotFound = 404,
    Blocked = 401,
    LoginAttempts = 402,
    NotConfirmed = 403,
    InvalidStatus = 405,
    NotActive = 406,
    InvalidLogin = 500,
    Failed = 501,
    ExceptionThrown = 502
}