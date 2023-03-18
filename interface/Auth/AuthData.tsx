import { Authority } from "./Authority";

export interface AuthData{
    name?: string;
    authorities: Authority[];
    authenticated: boolean;
}