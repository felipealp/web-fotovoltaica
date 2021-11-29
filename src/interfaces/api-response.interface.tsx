import { MessageCode } from "helpers/enums";

export interface IStandardApiResponse extends IApiResponse {
	value: string;
}

export interface IApiResponse {
	success: boolean | false;
	message: string;
	messageCode: MessageCode | MessageCode.ExceptionThrown;
	count: number | 0;
}