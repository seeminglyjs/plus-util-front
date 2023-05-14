
export interface AesDecryptResponseDto {
    aesKey: string,
    aesIv: string,
    aesContent: string,
    type: string,
    decryptContent: string
}