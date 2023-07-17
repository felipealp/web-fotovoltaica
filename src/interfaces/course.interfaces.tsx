import { IApiResponse } from "./api-response.interface";

export interface IListCoursesResponse extends IApiResponse {
	value: ICourses[];
}

export interface ICourses {
	id: string;
	shortName: string;
	name: string;
	longitude: number;
	latitude: number;
	status: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	countryRegion: string;
	localRegion: string;
	postalCode: string;
	county: string;
	phone: string;
	email: string;
	website: string;
	instagram: string;
	twitter: string;
	usgaCourseId: string;
	usgaUpdatedOn: Date;	
	isActive: boolean;
	dateCreated: Date;
	dateUpdated: Date | null;
	rowNumber: number;
}