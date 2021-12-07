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