export interface IStudentList {
	Data: IStudent[];
	Message: string;
	Success: boolean;
	IsAuthorized: boolean;
}

export interface IStudent {
	ID: number;
	Name: string;
	Mobile: string;
	Email: string;
	NationalID: string;
	Age: number;
}
