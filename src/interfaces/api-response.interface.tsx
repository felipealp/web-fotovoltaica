export interface IStandardApiResponse extends IApiResponse {
	value: string;
}

export interface IApiResponse {
	success: boolean | false;
	message: string;
	messageCode: number | 500;
	count: number | 0;
}