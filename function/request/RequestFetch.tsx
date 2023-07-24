
export const requestFetch = async (method : string, path: string, data : object|null, contentType : string ) => {

    if(method === 'POST' && data !== null){
        const url = `${process.env.API_BASE_URL}${path}`
    
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': contentType,
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        return checkResponse(response)

    }else if(method === 'GET' && data === null){
        const url = `${process.env.API_BASE_URL}${path}`
    
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': contentType,
            },
            credentials: 'include',
        });
    
        return checkResponse(response)
    }

    return null
}


const checkResponse = (response : Response) => {
    if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        console.error(errorMessage);
        return null;
    } else {
        return response
    }
}
