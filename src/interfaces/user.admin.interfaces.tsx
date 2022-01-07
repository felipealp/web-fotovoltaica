import { IApiResponse } from "./api-response.interface";

export interface IListUsersResponse extends IApiResponse {
	value: IUserList[];
}

export interface IUserList {
	id: string;
	name: string;
	email: string;
	role: string;
	status: number;
	loginAttempts: number;
	isActive: boolean;
	dateCreated: Date;
	dateUpdated: Date | null;
	dateLastAttempt: Date | null;
	rowNumber: number;
}
