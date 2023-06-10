

export interface UtilInfoInsertResponseDto {
    auth: boolean,
    utilName: string,
    utilDescription: string,
    utilViews: bigint,
    utilLikes: bigint,
    urlPath: string,
    category: string
}