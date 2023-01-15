import { UserData } from "./UserData";

export interface User {
    id: number;
    name: string;
    fullName: string;
    town: string;
    height: number;
    contact: string;
    userdata: UserData[];
}