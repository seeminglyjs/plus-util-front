import { NoticePageListDto } from "./NoticePageListDto";

export interface NoticeListDto {
    pageExist: boolean,
    currentPage: number,
    startPage: number,
    endPage: number,
    totalPage: number,
    noticePageList: NoticePageListDto
}