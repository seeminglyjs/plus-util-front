import { UtilLikeCheckResponseDto } from "@/interface/Encrypt/Aes/UtilLikeCheckResponseDto";
import { UtilLikeResponseDto } from '@/interface/Encrypt/Aes/UtilLikeResponseDto';
import { UtilLikeRevokeResponseDto } from '@/interface/Encrypt/Aes/UtilLikeRevokeResponseDto';

export const getUtilInfoByUrlPath = async (currentPath : string) => {
    const data = {
        urlPath: currentPath
    };

    const url = `${process.env.API_BASE_URL}/util/info/detail/url`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        console.error(errorMessage);
    }

    const jsonData = await response.json();
    const utilInfoDto = jsonData.data;
    return utilInfoDto
}

export const viewUtilInfoToday = async (utilNo: bigint) => {
    const data = {
        utilNo: utilNo
    };
    const url = `${process.env.API_BASE_URL}/util/info/view/click`
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        console.error(errorMessage);
    }
}

export const likeUtilInfoCheck = async (utilNo:bigint) => {
    const url = `${process.env.API_BASE_URL}/util/info/like/check/${utilNo}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
    if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        console.error(errorMessage);
        return false; //error 일 경우 default로 false 리턴
    } else {
        const utilLikeCheckResponseDto: UtilLikeCheckResponseDto = await response.json();
        return utilLikeCheckResponseDto.like;
    }
}

export const utilInfoLike = async (utilNo: bigint) => {
    const data = {
        utilNo: utilNo
    };
    const url = `${process.env.API_BASE_URL}/util/info/like`
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        console.error(errorMessage);
        return null
    } else {
        const utilLikeResponseDto: UtilLikeResponseDto = await response.json()
        return utilLikeResponseDto
    }
}


export const utilInfoLikeRevoke = async (utilNo: bigint) => {
    const data = {
        utilNo: utilNo
    };
    const url = `${process.env.API_BASE_URL}/util/info/like/revoke`
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        const errorMessage = `HTTP error! Status: ${response.status}`;
        console.error(errorMessage);
        return null
    } else {
        const utilLikeRevokeResponseDto: UtilLikeRevokeResponseDto = await response.json()
        return utilLikeRevokeResponseDto
    }
}