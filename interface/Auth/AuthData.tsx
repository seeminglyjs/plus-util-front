import { Authority } from "./Authority";

export interface AuthData {
    authenticated: boolean
    userNo : number
    userEmail : string
    userRole : string
    // name?: string
    // authorities: Authority[]
}