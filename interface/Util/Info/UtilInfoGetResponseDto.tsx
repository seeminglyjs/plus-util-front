import { UtilInfoDto } from "./UtilInfoDto";

export interface UtilInfoGetResponseDto {
    utilInfoDtoList : UtilInfoDto[],
    isEmpty: boolean,
}