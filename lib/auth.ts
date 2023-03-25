
export async function fetchAuthData(cookie: string): Promise<void> {
    const baseUrl = process.env.API_BASE_URL; // replace with your Spring Boot API endpoint base URL
    const url = `${baseUrl}/auth/`;
    console.log("url -> " + url)
  
    const response = await fetch(url, {
      headers: {
        Cookie: cookie ?? '',
      },
      credentials: 'include',
    });
  
    if (response.ok) {
      const authData = await response.json();
    }
  }