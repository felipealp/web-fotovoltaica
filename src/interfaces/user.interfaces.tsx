import { UserStatus } from "helpers/enums";
import { IApiResponse } from "./api-response.interface";

export interface ISignUpResponse extends IApiResponse {
	value: ICode;
}

export interface IResendCodeResponse extends IApiResponse {
	value: ICode;
}

export interface ISignUpRequest {
	name: string;
	email: string;
	password: string;
	ipaddress: string;
}

export interface IResendCodeRequest {	
	email: string;
}

export interface ICode {
	id: string;
	status: UserStatus;
	dateExpires: Date;
}