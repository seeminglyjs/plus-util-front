
export interface AesEncryptResponseDto {
    aesKey: string,
    aesIv: string,
    aesContent: string,
    type: string,
    encryptContent: string
}