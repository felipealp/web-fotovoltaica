export interface ILoginResponse {
	success: boolean | false;
	message: string;
	value: string;
	count: number | 0;
}

export interface ILoginRequest {
	login: string;
}