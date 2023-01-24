import { UserData } from "./UserData";

export interface User {
    id: number;
    name: string;
    pass: string;
    fullName: string;
    town: string;
    height: number;
    contact: string;
    userData: UserData[];
}