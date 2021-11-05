import jwt_decode from "jwt-decode";

import { identityServiceUrl } from "../helpers/urls.helper";
import { ILoginResponse, ILoginRequest } from "../interfaces/login.interface";
import { IStandardApiResponse } from "../interfaces/api-response.interface";
import { IJwt } from "../interfaces/jwt.interface";
import { fetchJwt } from "../helpers/jwt.helper";

export class LoginRequest implements ILoginRequest {
	login: string;

	constructor(value: string) {
		this.login = value;
	}
}

export class AuthService {
	async Login(loginString: string): Promise<ILoginResponse> {
		let body = new LoginRequest(loginString);

		try {
			const response = await fetch(identityServiceUrl + "/api/auth/login", {
				method: "post",
				headers: new Headers({
					"Content-Type": "application/json",
					Accept: "application/json",
				}),
				body: JSON.stringify(body),
			});

			const results = await Promise.resolve(response);
			return await results.json();
		} catch (error) {
			return await Promise.reject(error);
		}
	}

	IsAuthorized(jwt: string, role: string = ''): boolean {
		let decoded: IJwt;

		try {
			decoded = jwt_decode(jwt);
			var jwtRole = decoded.role;

			if (role === "") return true;
			if (role.toLowerCase === jwtRole.toLowerCase) return true;

			return false;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	async Validate(): Promise<IStandardApiResponse> {
		const errorResponse: IStandardApiResponse = {
			success: false,
			message: 'unauthorized',
			messageCode: 500,
			value: '',
			count: 0,
		};

		try {
			const response = await fetch(identityServiceUrl + '/api/auth/validate', {
				method: "get",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: "Bearer " + fetchJwt(),
					Accept: "application/json",
				}),
			});

			const results = await Promise.resolve(response);

			if (results.status === 401) {
				return await errorResponse;
			} else {
				return await results.json();
			}
		} catch (error) {
			return await Promise.reject(errorResponse);
		}
	}

	Logout(jwt: string) {
		localStorage.removeItem('jwt');
	}
}

export default AuthService;