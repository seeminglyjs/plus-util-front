import { AuthData } from "@/interface/Auth/AuthData";


export async function fetchAuthData(req: any): Promise<AuthData> {
    const baseUrl = process.env.API_BASE_URL;
    const cookie = req?.headers?.cookie;
    const url = `${baseUrl}/auth/`;

    const response = await fetch(url, {
        headers: {
            Cookie: cookie ?? '',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch auth data');
    }

    const authData: AuthData = await response.json();
    return authData;
}